import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Camera,
  Check,
  CheckCircle,
  Copy,
  CurrencyCircleDollar,
  Fingerprint,
  Gauge,
  LockKey,
  MapPin,
  Pause,
  Play,
  QrCode,
  Scan,
  ShieldCheck,
  Sparkle,
  Ticket,
  Wallet,
  WarningCircle,
  X,
} from '@phosphor-icons/react';
import type { IScannerControls } from '@zxing/browser';
import {
  cutoffForAge,
  dateToCompact,
  encodeArtworkUrl,
  formatNight,
  hexToBytes,
  nightToRaw,
} from '../../api/src/encoding';
import type {
  CreateEventInput,
  EventView,
  TicketView,
  ZkTicketDerivedState,
} from '../../api/src/common-types';
import type { ZkTicketAPI } from '../../api/src/index';
import type { BrowserZkTicketManager, WalletSummary } from './browser-manager';
import { encodeEntryProof, parseEntryProof, QR_TTL_MS, type EntryProofPayload } from './qr';
import { beginWalletConnection, listCompatibleWallets, type WalletConnectionAttempt, type WalletOption } from './wallet-connector';

const NETWORK_ID = import.meta.env.VITE_NETWORK_ID ?? 'preprod';
const DEFAULT_CONTRACT = import.meta.env.VITE_DEFAULT_CONTRACT ?? '';
const EMPTY_STATE: ZkTicketDerivedState = { eventCount: 0, ticketCount: 0, events: [], tickets: [] };
const EventStatus = {
  ACTIVE: 0 as EventView['status'],
  PAUSED: 1 as EventView['status'],
  CLOSED: 2 as EventView['status'],
};
const TicketTier = {
  GENERAL: 0 as TicketView['tier'],
  PREMIUM: 1 as TicketView['tier'],
};
type EventStatus = EventView['status'];
type TicketTier = TicketView['tier'];

type AppRoute = 'landing' | 'dashboard' | 'events' | 'tickets' | 'organizer' | 'verifier';
type Notice = { readonly tone: 'working' | 'success' | 'error'; readonly message: string };
type TransactionSuccess<T> = { readonly value: T };

const ROUTE_PATHS: Record<AppRoute, string> = {
  landing: '/',
  dashboard: '/app/dashboard',
  events: '/app/explore',
  tickets: '/app/tickets',
  organizer: '/app/studio',
  verifier: '/app/verify',
};

const routeFromPath = (pathname: string): AppRoute => {
  const match = (Object.entries(ROUTE_PATHS) as Array<[AppRoute, string]>).find(([, path]) => path === pathname.replace(/\/$/, '') || (path === '/' && pathname === '/'));
  return match?.[0] ?? (pathname.startsWith('/app') ? 'dashboard' : 'landing');
};

const eventStatusLabel = (status: EventStatus): string =>
  status === EventStatus.ACTIVE ? 'Live' : status === EventStatus.PAUSED ? 'Paused' : 'Closed';

const friendlyError = (error: unknown): string => {
  if (error instanceof Error) {
    const compactAssert = error.message.match(/failed assert:\s*([^\n]+)/i);
    return compactAssert?.[1] ?? error.message;
  }
  return typeof error === 'string' ? error : 'The transaction could not be completed.';
};

const shortAddress = (value: string, head = 8, tail = 6): string =>
  value.length > head + tail + 3 ? `${value.slice(0, head)}…${value.slice(-tail)}` : value;
const isContractAddress = (value: string): boolean => /^[\da-f]{64}$/i.test(value.trim());

const copyText = async (value: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    window.alert('Copying failed. Your browser may block clipboard access; copy the value manually.');
  }
};

function Bezel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bezel ${className}`}><div className="bezel-core">{children}</div></div>;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>{children}</div>;
}

function PrimaryButton({ children, icon = <ArrowUpRight />, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode }) {
  return (
    <button className={`primary-button group ${className}`} {...props}>
      <span>{children}</span><span className="button-orb">{icon}</span>
    </button>
  );
}

function SecondaryButton({ children, icon, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode }) {
  return <button className={`secondary-button ${className}`} {...props}>{children}{icon && <span className="inline-icon">{icon}</span>}</button>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow"><span className="eyebrow-dot" />{children}</span>;
}

function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark"><Ticket weight="light" /></span>
      <span>zkTicket</span>
    </span>
  );
}

function Header({ connected, route, wallet, onNavigate, onConnect }: {
  connected: boolean;
  route: AppRoute;
  wallet?: WalletSummary;
  onNavigate: (route: AppRoute) => void;
  onConnect: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const productLinks: Array<{ label: string; value: AppRoute }> = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Explore', value: 'events' },
    { label: 'My tickets', value: 'tickets' },
    { label: 'Studio', value: 'organizer' },
    { label: 'Verify', value: 'verifier' },
  ];
  const select = (next: AppRoute) => { onNavigate(next); setMenuOpen(false); };

  return (
    <>
      <header className="island-nav">
        <button className="brand-button" onClick={() => select('landing')} aria-label="Go to zkTicket home"><Brand /></button>
        {connected ? <nav className="desktop-nav product-nav" aria-label="Primary">
          {productLinks.map((link) => <a key={link.value} href={ROUTE_PATHS[link.value]} className={route === link.value ? 'active' : ''} onClick={(event) => { event.preventDefault(); select(link.value); }}>{link.label}</a>)}
        </nav> : <nav className="desktop-nav marketing-nav" aria-label="Landing page">
          <a href="#privacy">Privacy</a><a href="#how-it-works">How it works</a>
        </nav>}
        <div className="nav-actions">
          {connected && wallet ? <span className="wallet-pill"><CheckCircle weight="fill" /><span>{shortAddress(wallet.unshieldedAddress, 5, 4)}</span></span> : <span className="network-pill"><span />{NETWORK_ID}</span>}
          {!connected && <button className="nav-connect" onClick={onConnect}><Wallet weight="light" />Connect wallet</button>}
        </div>
        <button className={`menu-button ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Mobile primary">
          {connected ? productLinks.map((link, index) => <button key={link.value} style={{ '--menu-delay': `${120 + index * 70}ms` } as CSSProperties} onClick={() => select(link.value)}>{link.label}<ArrowUpRight weight="light" /></button>) : <>
            <button style={{ '--menu-delay': '120ms' } as CSSProperties} onClick={() => { window.location.hash = 'privacy'; setMenuOpen(false); }}>Privacy<ArrowUpRight weight="light" /></button>
            <button style={{ '--menu-delay': '190ms' } as CSSProperties} onClick={() => { window.location.hash = 'how-it-works'; setMenuOpen(false); }}>How it works<ArrowUpRight weight="light" /></button>
            <button style={{ '--menu-delay': '260ms' } as CSSProperties} onClick={() => { setMenuOpen(false); onConnect(); }}>Connect wallet<Wallet weight="light" /></button>
          </>}
        </nav>
      </div>
    </>
  );
}

function ConnectionPanel({ address, setAddress, busy, onJoin, onDeploy, walletOptions, walletId, setWalletId }: {
  address: string;
  setAddress: (value: string) => void;
  busy: boolean;
  onJoin: () => void;
  onDeploy: () => void;
  walletOptions: WalletOption[];
  walletId: string;
  setWalletId: (value: string) => void;
}) {
  const addressInvalid = !!address.trim() && !isContractAddress(address);
  const selectedWallet = walletOptions.find((option) => option.id === walletId)?.wallet ?? walletOptions[0]?.wallet;
  const walletName = selectedWallet?.name || 'Midnight wallet';
  return (
      <div className="connect-panel">
        <div className="connect-heading"><span className="connect-icon"><Wallet weight="light" /></span><div><span>{walletName}</span><small>Join zkTicket · Midnight {NETWORK_ID}</small></div></div>
        {walletOptions.length > 1 && <label className="wallet-picker"><span>Choose wallet</span><div className="input-shell select-shell"><select value={walletId} onChange={(event) => setWalletId(event.target.value)}>{walletOptions.map((option) => <option key={option.id} value={option.id}>{option.wallet.name}</option>)}</select><ArrowDown weight="light" /></div></label>}
        {!walletOptions.length && <p className="wallet-missing"><WarningCircle weight="light" />Unlock a Connector 4.x Midnight wallet, then reopen this dialog.</p>}
        <div className="connect-destination"><span><span className="pulse-dot" />zkTicket protocol</span><small>Live on preprod</small></div>
        <PrimaryButton onClick={onJoin} disabled={busy || !walletOptions.length || !isContractAddress(address)} className="full-button wallet-connect-button" icon={<ArrowRight weight="light" />}>{busy ? 'Connecting…' : `Connect ${walletName}`}</PrimaryButton>
        <p className="connect-note"><LockKey weight="light" /> Connect without sharing your identity. Your wallet handles approvals, proofs and transactions.</p>
        <details className="advanced-connect">
          <summary>Advanced settings <ArrowDown weight="light" /></summary>
          <div className="advanced-connect-body">
            <label className="field-label" htmlFor="contract-address">Contract address</label>
            <div className="input-shell"><input id="contract-address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Paste a deployed contract address" autoComplete="off" aria-invalid={addressInvalid} aria-describedby={addressInvalid ? 'contract-address-error' : undefined} /></div>
            {addressInvalid && <p id="contract-address-error" className="validation-error">Enter the 64-character Midnight contract address.</p>}
            <SecondaryButton onClick={onDeploy} disabled={busy} className="full-button" icon={<Sparkle weight="light" />}>Deploy a fresh protocol</SecondaryButton>
            <small>Developer option: creates a separate Compact contract on preprod.</small>
          </div>
        </details>
      </div>
  );
}

function WalletModal({ open, onClose, ...props }: Parameters<typeof ConnectionPanel>[0] & { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', onKeyDown); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="modal-backdrop wallet-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <Bezel className="wallet-dialog"><div className="wallet-dialog-core" role="dialog" aria-modal="true" aria-labelledby="wallet-dialog-title">
      <button className="modal-close" onClick={onClose} aria-label="Close wallet dialog"><X weight="light" /></button>
      <Eyebrow>Enter the protocol</Eyebrow><h2 id="wallet-dialog-title">Connect your<br /><em>Midnight wallet.</em></h2>
      <ConnectionPanel {...props} />
    </div></Bezel>
  </div>;
}

function ProtocolPreview() {
  return <Bezel className="protocol-preview"><div className="preview-core">
    <div className="preview-poster"><div className="preview-orbit"><i /><i /><i /></div><span>PRIVATE<br />ACCESS</span><small>ZERO KNOWLEDGE / MIDNIGHT</small></div>
    <div className="preview-ticket-cut"><span>ADMIT / 01</span><i /><span>IDENTITY / HIDDEN</span></div>
    <div className="preview-bottom"><div><span className="pulse-dot" />Protocol ready</div><strong>Prove access.<br />Reveal nothing else.</strong><small>Ticket artwork is chosen by each organizer and stored with the event on-chain.</small></div>
  </div></Bezel>;
}

function Landing({ connected, onConnect, onDashboard }: { connected: boolean; onConnect: () => void; onDashboard: () => void }) {
  return (
    <main id="main-content">
      <section className="hero section-pad">
        <div className="hero-copy">
          <Reveal><Eyebrow>Private access on Midnight</Eyebrow></Reveal>
          <Reveal delay={80}><h1>Prove you belong.<br /><em>Keep who you are.</em></h1></Reveal>
          <Reveal delay={160}><p className="hero-lede">Programmable event tickets that reveal one fact at the door: access approved. Your identity and date of birth stay yours.</p></Reveal>
          <Reveal delay={220}><div className="hero-actions"><PrimaryButton onClick={connected ? onDashboard : onConnect} icon={<ArrowRight weight="light" />}>{connected ? 'Open dashboard' : 'Connect wallet'}</PrimaryButton><a href="#how-it-works">See how it works<ArrowDown weight="light" /></a></div></Reveal>
          <Reveal delay={280}><div className="hero-proof-row"><div><ShieldCheck weight="light" /><span>Zero-knowledge<br /><small>eligibility proofs</small></span></div><div><Fingerprint weight="light" /><span>Private ownership<br /><small>unlinkable to wallet</small></span></div></div></Reveal>
        </div>
        <Reveal className="hero-card-column" delay={100}><ProtocolPreview /><div className="chain-caption"><span className="pulse-dot" />Transactions settle on Midnight {NETWORK_ID}</div></Reveal>
      </section>

      <section className="manifesto section-pad" id="privacy">
        <Reveal className="manifesto-heading"><Eyebrow>The privacy boundary</Eyebrow><h2>The venue learns what it needs.<br />Nothing it doesn’t.</h2></Reveal>
        <div className="bento-grid">
          <Reveal className="bento-large" delay={40}><Bezel><article className="feature-card feature-card-large"><span className="card-index">01 / ENTRY</span><QrCode weight="light" /><h3>A proof, not a profile</h3><p>Each 60-second QR carries a one-time entry secret. The contract validates its commitment and burns its reuse path on redemption.</p><div className="mini-qr" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></article></Bezel></Reveal>
          <Reveal delay={100}><Bezel><article className="feature-card"><span className="card-index">02 / AGE</span><CalendarBlank weight="light" /><h3>Over 18. Date hidden.</h3><p>A private birth date satisfies the event cutoff inside the proof.</p></article></Bezel></Reveal>
          <Reveal delay={160}><Bezel><article className="feature-card accent-card"><span className="card-index">03 / REPLAY</span><ShieldCheck weight="light" /><h3>One ticket.<br />One entry.</h3><p>Redemption is atomic and on-chain.</p></article></Bezel></Reveal>
        </div>
      </section>

      <section className="flow-section section-pad" id="how-it-works">
        <Reveal><Eyebrow>One quiet flow</Eyebrow><h2>From on-chain issue<br />to private admission.</h2></Reveal>
        <div className="flow-line">
          {[
            ['01', 'Discover', 'Read event state directly from Midnight.'],
            ['02', 'Purchase', 'Pay NIGHT and receive an owner commitment.'],
            ['03', 'Prove', 'Generate eligibility locally through your wallet.'],
            ['04', 'Enter', 'Scan, verify and redeem exactly once.'],
          ].map(([number, title, body], index) => <Reveal key={number} delay={index * 70}><div className="flow-step"><span>{number}</span><h3>{title}</h3><p>{body}</p></div></Reveal>)}
        </div>
      </section>
    </main>
  );
}

function DashboardHero({ state, wallet, contractAddress }: { state: ZkTicketDerivedState; wallet: WalletSummary; contractAddress: string }) {
  const redeemed = state.events.reduce((sum, event) => sum + event.redeemed, 0);
  return (
    <section className="dashboard-hero section-pad">
      <Reveal className="dashboard-intro"><Eyebrow>Protocol is live</Eyebrow><h1>Private access,<br /><em>in motion.</em></h1><p>Every value below is read from the deployed Compact contract.</p></Reveal>
      <Reveal className="protocol-console" delay={100}><Bezel><div className="console-core">
        <div className="console-top"><span><span className="pulse-dot" />Midnight {wallet.networkId}</span><ShieldCheck weight="light" /></div>
        <dl><div><dt>Contract</dt><dd>{shortAddress(contractAddress, 12, 10)}<button onClick={() => copyText(contractAddress)} aria-label="Copy contract address"><Copy weight="light" /></button></dd></div><div><dt>Wallet</dt><dd>{shortAddress(wallet.unshieldedAddress, 12, 8)}</dd></div><div><dt>Proof server</dt><dd>{wallet.proofServer}</dd></div></dl>
      </div></Bezel></Reveal>
      <div className="stat-rail">
        <Reveal><div className="stat"><span>Events</span><strong>{state.eventCount.toString().padStart(2, '0')}</strong></div></Reveal>
        <Reveal delay={70}><div className="stat"><span>Tickets issued</span><strong>{state.ticketCount.toString().padStart(2, '0')}</strong></div></Reveal>
        <Reveal delay={140}><div className="stat"><span>Entries verified</span><strong>{redeemed.toString().padStart(2, '0')}</strong></div></Reveal>
      </div>
      <ArrowDown className="hero-down" weight="light" />
    </section>
  );
}

function DashboardHome({ state, wallet, contractAddress, onNavigate }: { state: ZkTicketDerivedState; wallet: WalletSummary; contractAddress: string; onNavigate: (route: AppRoute) => void }) {
  const actions: Array<{ route: AppRoute; label: string; title: string; body: string; icon: ReactNode }> = [
    { route: 'events', label: 'ATTENDEE', title: 'Explore live events', body: 'Browse contract-backed inventory and purchase private access with NIGHT.', icon: <CalendarBlank weight="light" /> },
    { route: 'tickets', label: 'PRIVATE WALLET', title: 'Use your tickets', body: 'Generate entry proofs, transfer ownership, and protect your local access key.', icon: <Ticket weight="light" /> },
    { route: 'organizer', label: 'ORGANIZER', title: 'Publish an experience', body: 'Create image-led event passes and control their on-chain lifecycle.', icon: <Sparkle weight="light" /> },
    { route: 'verifier', label: 'DOOR', title: 'Verify an entry', body: 'Scan a one-time proof and redeem it atomically on Midnight.', icon: <Scan weight="light" /> },
  ];
  return <>
    <DashboardHero state={state} wallet={wallet} contractAddress={contractAddress} />
    <section className="dashboard-actions section-pad">
      <Reveal className="section-heading"><div><Eyebrow>Choose a workspace</Eyebrow><h2>Everything has<br /><em>its own place.</em></h2></div><p>Each job now lives on a dedicated route, without mixing attendee, organizer, and verifier controls.</p></Reveal>
      <div className="action-grid">{actions.map((action, index) => <Reveal key={action.route} delay={index * 60}><button className="action-card" onClick={() => onNavigate(action.route)}><span className="action-icon">{action.icon}</span><small>{action.label}</small><h3>{action.title}</h3><p>{action.body}</p><i><ArrowUpRight weight="light" /></i></button></Reveal>)}</div>
    </section>
  </>;
}

function AccessGate({ onConnect }: { onConnect: () => void }) {
  return <main id="main-content" className="access-gate section-pad"><Reveal><Bezel><div className="access-gate-core"><span className="gate-icon"><LockKey weight="light" /></span><Eyebrow>Private workspace</Eyebrow><h1>Connect once.<br /><em>Enter every room.</em></h1><p>Your wallet authorizes the session. zkTicket then reads the selected preprod contract and opens the dashboard without requesting personal details.</p><PrimaryButton onClick={onConnect} icon={<Wallet weight="light" />}>Connect wallet</PrimaryButton><small>Connector API 4.x · Midnight {NETWORK_ID}</small></div></Bezel></Reveal></main>;
}

function EventCard({ event, onBuy }: { event: EventView; onBuy: (event: EventView, tier: TicketTier) => void }) {
  const soldOut = event.issued >= event.capacity;
  const disabled = soldOut || event.status !== EventStatus.ACTIVE;
  const fill = Math.min(100, Math.round((event.issued / event.capacity) * 100));
  return (
    <Bezel className="event-bezel">
      <article className="event-card">
        <div className="event-topline"><span className={`status-badge status-${eventStatusLabel(event.status).toLowerCase()}`}><i />{soldOut ? 'Sold out' : eventStatusLabel(event.status)}</span><span className="event-number">#{String(event.id).padStart(2, '0')}</span></div>
        <div className="event-art">{event.artworkUrl ? <img src={event.artworkUrl} alt={`${event.name} event artwork`} loading="lazy" referrerPolicy="no-referrer" /> : <div className="orbital"><span /><span /><span /></div>}<span className="image-source">ON-CHAIN ARTWORK</span><span className="age-mark">{event.minAge ? `${event.minAge}+` : 'ALL'}</span></div>
        <div className="event-content"><p className="event-date">{event.dateLabel}</p><h3>{event.name}</h3><p className="event-location"><MapPin weight="light" />{event.venue}</p>
          <div className="capacity"><div><span>Capacity</span><b>{event.issued} / {event.capacity}</b></div><div className="capacity-track"><span style={{ transform: `scaleX(${fill / 100})` }} /></div></div>
          <div className="ticket-options">
            <button disabled={disabled} onClick={() => onBuy(event, TicketTier.GENERAL)}><span>General</span><b>{formatNight(event.generalPrice)} NIGHT</b><i><ArrowUpRight weight="light" /></i></button>
            <button disabled={disabled} onClick={() => onBuy(event, TicketTier.PREMIUM)}><span>Premium</span><b>{formatNight(event.premiumPrice)} NIGHT</b><i><ArrowUpRight weight="light" /></i></button>
          </div>
        </div>
      </article>
    </Bezel>
  );
}

function EventsView({ events, onBuy }: { events: EventView[]; onBuy: (event: EventView, tier: TicketTier) => void }) {
  return (
    <section className="workspace-section section-pad">
      <Reveal className="section-heading"><div><Eyebrow>Public ledger</Eyebrow><h2>Find your next<br /><em>unforgettable night.</em></h2></div><p>Event supply, prices and status arrive directly from the deployed contract.</p></Reveal>
      {events.length ? <div className="events-grid">{events.map((event, index) => <Reveal key={event.id} delay={(index % 3) * 70}><EventCard event={event} onBuy={onBuy} /></Reveal>)}</div> : <EmptyState icon={<CalendarBlank weight="light" />} title="The calendar is waiting" body="Create the first on-chain event from the Organizer studio." />}
    </section>
  );
}

function TicketCard({ ticket, event, birthDate, setBirthDate, api, runTransaction, onProof }: {
  ticket: TicketView;
  event?: EventView;
  birthDate: string;
  setBirthDate: (value: string) => void;
  api: ZkTicketAPI;
  runTransaction: <T>(label: string, action: () => Promise<T>) => Promise<TransactionSuccess<T> | undefined>;
  onProof: (ticket: TicketView, event: EventView, secret: Uint8Array) => void;
}) {
  const [recipient, setRecipient] = useState('');
  const proofBirthDate = (): bigint => event?.minAge ? dateToCompact(birthDate) : 0n;
  const prepare = async () => {
    if (!event) return;
    const completed = await runTransaction('Generating private entry proof', () => api.prepareEntry(ticket.id, proofBirthDate()));
    if (completed) onProof(ticket, event, completed.value);
  };
  return (
    <Bezel className="ticket-bezel"><article className={`ticket-card ${ticket.used ? 'used' : ''}`}>
      <div className="ticket-spine"><span>zk</span><small>{String(ticket.id).padStart(4, '0')}</small></div>
      <div className="ticket-visual">{event?.artworkUrl ? <img src={event.artworkUrl} alt="" referrerPolicy="no-referrer" /> : <div className="ticket-monogram">{event?.name.slice(0, 2).toUpperCase() ?? 'ZK'}</div>}<span>EVENT / {String(ticket.eventId).padStart(2, '0')}</span></div>
      <div className="ticket-main">
        <div className="ticket-head"><div><span className="ticket-tier">{ticket.tier === TicketTier.PREMIUM ? 'Premium pass' : 'General pass'}</span><h3>{event?.name ?? `Event #${ticket.eventId}`}</h3></div><span className={`ticket-state ${ticket.used ? 'spent' : ''}`}>{ticket.used ? <X weight="light" /> : <Check weight="light" />}{ticket.used ? 'Used' : 'Valid'}</span></div>
        <div className="ticket-meta"><span><CalendarBlank weight="light" />{event?.dateLabel ?? 'On-chain event'}</span><span><MapPin weight="light" />{event?.venue ?? 'Venue unavailable'}</span><span><Fingerprint weight="light" />Identity protected</span></div>
        {!ticket.used && <>
          {event?.minAge ? <label className="inline-field"><span>Private date of birth</span><div className="input-shell"><input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} /></div><small>Used only as a local witness for the {event.minAge}+ proof.</small></label> : null}
          <div className="ticket-actions"><PrimaryButton onClick={prepare} disabled={!!event?.minAge && !birthDate} icon={<QrCode weight="light" />}>Generate entry proof</PrimaryButton><SecondaryButton onClick={() => runTransaction('Proving eligibility', () => api.proveEligibility(ticket.id, proofBirthDate()))} disabled={!!event?.minAge && !birthDate} icon={<ShieldCheck weight="light" />}>Test eligibility</SecondaryButton></div>
          <details className="transfer-drawer"><summary>Transfer this ticket <ArrowDown weight="light" /></summary><p>The recipient generates a receiving code for this event. Only its commitment is published.</p><div className="transfer-row"><div className="input-shell"><input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="64-character recipient code" /></div><SecondaryButton disabled={!recipient.trim()} onClick={() => runTransaction('Transferring private ownership', () => api.transferTicket(ticket.id, recipient))}>Transfer</SecondaryButton></div><small>{ticket.transfers} of {event?.maxTransfers ?? '—'} transfers used</small></details>
        </>}
      </div>
    </article></Bezel>
  );
}

function PrivacyVault({ onExport, onImport }: {
  onExport: (passphrase: string) => Promise<string>;
  onImport: (backup: string, passphrase: string) => Promise<void>;
}) {
  const [passphrase, setPassphrase] = useState('');
  const [backup, setBackup] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const exportKey = async () => {
    setBusy(true); setMessage('');
    try { setBackup(await onExport(passphrase)); setMessage('Encrypted backup created. Store it separately from the passphrase.'); }
    catch (error) { setMessage(friendlyError(error)); }
    finally { setBusy(false); }
  };
  const importKey = async () => {
    setBusy(true); setMessage('');
    try { await onImport(backup, passphrase); }
    catch (error) { setMessage(friendlyError(error)); setBusy(false); }
  };
  return (
    <Bezel className="vault-bezel"><aside className="privacy-vault">
      <div className="vault-title"><LockKey weight="light" /><div><Eyebrow>Recovery</Eyebrow><h3>Protect your access key</h3></div></div>
      <p>Your private identity controls owned tickets and organizer rights. Export an AES-256-GCM encrypted backup before clearing browser data or changing devices.</p>
      <label className="field-label" htmlFor="vault-passphrase">Backup passphrase</label>
      <div className="input-shell"><input id="vault-passphrase" type="password" autoComplete="new-password" value={passphrase} onChange={(event) => setPassphrase(event.target.value)} placeholder="16+ characters, three character types" /></div>
      <label className="field-label" htmlFor="vault-backup">Encrypted backup</label>
      <div className="textarea-shell"><textarea id="vault-backup" value={backup} onChange={(event) => setBackup(event.target.value)} placeholder="Create a backup here, or paste one to restore" spellCheck={false} /></div>
      <div className="vault-actions"><SecondaryButton type="button" disabled={busy || !passphrase} onClick={() => void exportKey()}>Create backup</SecondaryButton><SecondaryButton type="button" disabled={busy || !passphrase || !backup.trim()} onClick={() => void importKey()}>Restore & reload</SecondaryButton></div>
      {message && <p className="vault-message" role="status">{message}</p>}
      <small>PBKDF2-SHA-256 · 600,000 iterations · AES-256-GCM</small>
    </aside></Bezel>
  );
}

function TicketsView({ tickets, events, api, runTransaction, onProof, onExport, onImport }: {
  tickets: TicketView[];
  events: EventView[];
  api: ZkTicketAPI;
  runTransaction: <T>(label: string, action: () => Promise<T>) => Promise<TransactionSuccess<T> | undefined>;
  onProof: (ticket: TicketView, event: EventView, secret: Uint8Array) => void;
  onExport: (passphrase: string) => Promise<string>;
  onImport: (backup: string, passphrase: string) => Promise<void>;
}) {
  const [birthDate, setBirthDate] = useState('');
  const [receiveEvent, setReceiveEvent] = useState(events[0]?.id ?? 0);
  const owned = tickets.filter((ticket) => api.ownsTicket(ticket));
  const receivingCode = receiveEvent ? api.getReceivingCode(receiveEvent) : '';
  useEffect(() => { if (!receiveEvent && events[0]) setReceiveEvent(events[0].id); }, [events, receiveEvent]);
  return (
    <section className="workspace-section section-pad">
      <Reveal className="section-heading"><div><Eyebrow>Private wallet</Eyebrow><h2>Your access.<br /><em>Under your control.</em></h2></div><p>Ownership is found locally by matching your secret-derived commitment. Your wallet address is never stored with a ticket.</p></Reveal>
      <div className="ticket-layout">
        <div className="ticket-list">{owned.length ? owned.map((ticket, index) => <Reveal key={ticket.id} delay={(index % 3) * 60}><TicketCard ticket={ticket} event={events.find((event) => event.id === ticket.eventId)} birthDate={birthDate} setBirthDate={setBirthDate} api={api} runTransaction={runTransaction} onProof={onProof} /></Reveal>) : <EmptyState icon={<Ticket weight="light" />} title="No private tickets found" body="Purchase an active event ticket or receive a transfer using your event-specific code." />}</div>
        <Reveal className="receive-column" delay={120}><div className="side-stack"><Bezel><aside className="receive-card"><span className="receive-icon"><Fingerprint weight="light" /></span><Eyebrow>Receive privately</Eyebrow><h3>Share a commitment,<br />not your wallet.</h3><p>Select an event and send this code to the current ticket holder.</p><label className="field-label" htmlFor="receive-event">Event</label><div className="input-shell select-shell"><select id="receive-event" value={receiveEvent} onChange={(event) => setReceiveEvent(Number(event.target.value))}>{events.map((event) => <option key={event.id} value={event.id}>{event.name}</option>)}</select></div>{receivingCode && <div className="code-block"><code>{receivingCode}</code><button onClick={() => copyText(receivingCode)} aria-label="Copy receiving code"><Copy weight="light" /></button></div>}<small>Derived locally for event #{receiveEvent || '—'}</small></aside></Bezel><PrivacyVault onExport={onExport} onImport={onImport} /></div></Reveal>
      </div>
    </section>
  );
}

function CreateEventForm({ onCreate }: { onCreate: (input: CreateEventInput) => Promise<unknown | undefined> }) {
  const dates = useMemo(() => { const today = new Date(); const future = new Date(today); future.setDate(future.getDate() + 30); return { today: today.toISOString().slice(0, 10), future: future.toISOString().slice(0, 10) }; }, []);
  const [form, setForm] = useState({ name: '', venue: '', artworkUrl: '', date: dates.future, time: '19:00', minAge: '0', capacity: '250', generalPrice: '1', premiumPrice: '2', maxTransfers: '2' });
  const [validationError, setValidationError] = useState('');
  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setValidationError('');
    try {
      const minAge = Number(form.minAge);
      const eventDate = new Date(`${form.date}T${form.time}:00`);
      if (Number.isNaN(eventDate.valueOf()) || eventDate.valueOf() <= Date.now()) throw new Error('Choose a future event date and time.');
      encodeArtworkUrl(form.artworkUrl);
      const input: CreateEventInput = {
        name: form.name,
        venue: form.venue,
        dateLabel: new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(eventDate),
        artworkUrl: form.artworkUrl,
        startsAt: BigInt(Math.floor(eventDate.valueOf() / 1000)),
        minAge: BigInt(minAge),
        ageCutoff: cutoffForAge(form.date, minAge),
        capacity: BigInt(form.capacity),
        generalPrice: nightToRaw(form.generalPrice),
        premiumPrice: nightToRaw(form.premiumPrice),
        maxTransfers: BigInt(form.maxTransfers),
      };
      const completed = await onCreate(input);
      if (completed) setForm((current) => ({ ...current, name: '', venue: '', artworkUrl: '' }));
    } catch (error) { setValidationError(friendlyError(error)); }
  };
  return (
    <form className="create-form" onSubmit={submit}>
      <div className="artwork-field"><label><span>Ticket artwork URL</span><div className="input-shell"><input required type="url" inputMode="url" value={form.artworkUrl} onChange={update('artworkUrl')} placeholder="https://images.example.com/your-event.webp" /></div><small>HTTPS only · up to 128 UTF-8 bytes · saved in the event’s public on-chain record.</small></label>{form.artworkUrl.startsWith('https://') && <div className="artwork-preview"><img src={form.artworkUrl} alt="Event artwork preview" referrerPolicy="no-referrer" /><span>LIVE PREVIEW</span></div>}</div>
      <div className="form-grid"><label><span>Event name</span><div className="input-shell"><input required maxLength={32} value={form.name} onChange={update('name')} placeholder="Midnight Sessions" /></div></label><label><span>Venue</span><div className="input-shell"><input required maxLength={32} value={form.venue} onChange={update('venue')} placeholder="Bangalore Palace" /></div></label><label><span>Date</span><div className="input-shell"><input required min={dates.today} type="date" value={form.date} onChange={update('date')} /></div></label><label><span>Doors open</span><div className="input-shell"><input required type="time" value={form.time} onChange={update('time')} /></div></label><label><span>Minimum age</span><div className="input-shell select-shell"><select value={form.minAge} onChange={update('minAge')}><option value="0">All ages</option><option value="16">16+</option><option value="18">18+</option><option value="21">21+</option></select></div></label><label><span>Capacity</span><div className="input-shell"><input required min="1" step="1" type="number" value={form.capacity} onChange={update('capacity')} /></div></label><label><span>General · NIGHT</span><div className="input-shell"><input required min="0" step="0.000001" inputMode="decimal" value={form.generalPrice} onChange={update('generalPrice')} /></div></label><label><span>Premium · NIGHT</span><div className="input-shell"><input required min="0" step="0.000001" inputMode="decimal" value={form.premiumPrice} onChange={update('premiumPrice')} /></div></label><label><span>Transfer limit</span><div className="input-shell"><input required min="0" max="8" step="1" type="number" value={form.maxTransfers} onChange={update('maxTransfers')} /></div></label></div>
      {validationError && <p className="validation-error" role="alert">{validationError}</p>}
      <PrimaryButton type="submit" icon={<Sparkle weight="light" />}>Create on Midnight</PrimaryButton>
    </form>
  );
}

function OrganizerView({ events, api, wallet, runTransaction }: {
  events: EventView[];
  api: ZkTicketAPI;
  wallet: WalletSummary;
  runTransaction: <T>(label: string, action: () => Promise<T>) => Promise<TransactionSuccess<T> | undefined>;
}) {
  const organizerHash = api.getOrganizerCommitment();
  const mine = events.filter((event) => event.organizerHash === organizerHash);
  return (
    <section className="workspace-section section-pad">
      <Reveal className="section-heading"><div><Eyebrow>Organizer studio</Eyebrow><h2>Program the door.<br /><em>Not the attendee.</em></h2></div><p>Create priced, capacity-bound experiences and operate them through secret-derived organizer authority.</p></Reveal>
      <div className="organizer-grid">
        <Reveal><Bezel><div className="studio-card"><div className="studio-title"><span><Sparkle weight="light" /></span><div><Eyebrow>New experience</Eyebrow><h3>Publish an event</h3></div></div><CreateEventForm onCreate={(input) => runTransaction('Publishing event on Midnight', () => api.createEvent(input))} /></div></Bezel></Reveal>
        <div className="operations-column">
          {mine.length ? mine.map((event, index) => <Reveal key={event.id} delay={index * 60}><Bezel><article className="operation-card"><div className="operation-head"><div><span>EVENT / {String(event.id).padStart(2, '0')}</span><h3>{event.name}</h3></div><span className={`status-badge status-${eventStatusLabel(event.status).toLowerCase()}`}><i />{eventStatusLabel(event.status)}</span></div><div className="operation-stats"><div><Ticket weight="light" /><span>Issued<strong>{event.issued}</strong></span></div><div><Scan weight="light" /><span>Redeemed<strong>{event.redeemed}</strong></span></div><div><CurrencyCircleDollar weight="light" /><span>Revenue<strong>{formatNight(event.revenue)}</strong></span></div></div><div className="operation-actions"><SecondaryButton onClick={() => runTransaction('Opening event sales', () => api.setEventStatus(event.id, EventStatus.ACTIVE))} disabled={event.status === EventStatus.ACTIVE} icon={<Play weight="light" />}>Open</SecondaryButton><SecondaryButton onClick={() => runTransaction('Pausing event sales', () => api.setEventStatus(event.id, EventStatus.PAUSED))} disabled={event.status === EventStatus.PAUSED} icon={<Pause weight="light" />}>Pause</SecondaryButton><SecondaryButton onClick={() => runTransaction('Closing event', () => api.setEventStatus(event.id, EventStatus.CLOSED))} disabled={event.status === EventStatus.CLOSED} icon={<X weight="light" />}>Close</SecondaryButton></div>{event.revenue > event.proceedsClaimed && <PrimaryButton className="claim-button" onClick={() => runTransaction('Claiming event proceeds', () => api.claimEventProceeds(event.id, wallet.unshieldedAddress))} icon={<ArrowUpRight weight="light" />}>Claim {formatNight(event.revenue - event.proceedsClaimed)} NIGHT</PrimaryButton>}</article></Bezel></Reveal>) : <EmptyState icon={<Gauge weight="light" />} title="No organizer events yet" body="Your secret-derived organizer identity will match every event you create here." />}
        </div>
      </div>
    </section>
  );
}

function CameraScanner({ onCode }: { onCode: (value: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | undefined>(undefined);
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  const stop = () => { controlsRef.current?.stop(); controlsRef.current = undefined; setActive(false); };
  useEffect(() => stop, []);
  const start = async () => {
    setError(''); setActive(true);
    try {
      const { BrowserQRCodeReader } = await import('@zxing/browser');
      const reader = new BrowserQRCodeReader();
      controlsRef.current = await reader.decodeFromVideoDevice(undefined, videoRef.current!, (result) => {
        if (result) { onCode(result.getText()); stop(); }
      });
    } catch (cause) { setError(friendlyError(cause)); setActive(false); }
  };
  return <div className={`camera-shell ${active ? 'active' : ''}`}><video ref={videoRef} muted playsInline /><div className="scanner-frame"><i /><i /><i /><i /></div>{!active && <button onClick={start}><Camera weight="light" /><span>Start camera scanner</span></button>}{active && <button className="stop-scan" onClick={stop}><X weight="light" />Stop</button>}{error && <small>{error}</small>}</div>;
}

function VerifierView({ api, contractAddress, events, runTransaction }: {
  api: ZkTicketAPI;
  contractAddress: string;
  events: EventView[];
  runTransaction: <T>(label: string, action: () => Promise<T>) => Promise<TransactionSuccess<T> | undefined>;
}) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ proof: EntryProofPayload; event?: EventView }>();
  const [validationError, setValidationError] = useState('');
  const verify = async () => {
    setValidationError('');
    setResult(undefined);
    try {
      const proof = parseEntryProof(code, NETWORK_ID, contractAddress);
      const completed = await runTransaction('Verifying proof and redeeming ticket', () => api.redeemTicket(proof.ticketId, hexToBytes(proof.secret)));
      if (completed) setResult({ proof, event: events.find((event) => event.id === proof.eventId) });
    } catch (error) { setValidationError(friendlyError(error)); }
  };
  return (
    <section className="workspace-section section-pad verifier-section">
      <Reveal className="section-heading"><div><Eyebrow>Door verifier</Eyebrow><h2>One scan.<br /><em>Only the answer.</em></h2></div><p>The scanner submits the temporary secret as a private circuit input. The ledger returns admission or a precise refusal.</p></Reveal>
      <div className="verifier-grid">
        <Reveal><Bezel><div className="scanner-card"><CameraScanner onCode={(value) => { setCode(value); setValidationError(''); }} /><div className="scan-divider"><span>or paste payload</span></div><label className="field-label">Entry proof</label><div className="textarea-shell"><textarea value={code} onChange={(event) => { setCode(event.target.value); setValidationError(''); }} placeholder={'{"v":1,"network":"preprod",…}'} /></div>{validationError && <p className="validation-error" role="alert">{validationError}</p>}<PrimaryButton className="full-button" disabled={!code.trim()} onClick={() => void verify()} icon={<Scan weight="light" />}>Verify & redeem</PrimaryButton></div></Bezel></Reveal>
        <Reveal delay={100}><Bezel><div className={`verification-result ${result ? 'approved' : ''}`}>{result ? <><span className="approval-icon"><CheckCircle weight="light" /></span><Eyebrow>On-chain confirmation</Eyebrow><h3>Access approved</h3><p>The proof matched and ticket #{result.proof.ticketId} is now irreversibly redeemed.</p><dl><div><dt>Event</dt><dd>{result.event?.name ?? `#${result.proof.eventId}`}</dd></div><div><dt>Age policy</dt><dd>{result.event?.minAge ? `${result.event.minAge}+ verified` : 'All ages'}</dd></div><div><dt>Identity</dt><dd>Not disclosed</dd></div><div><dt>Replay status</dt><dd>Blocked</dd></div></dl></> : <><span className="pending-ring"><ShieldCheck weight="light" /></span><Eyebrow>Awaiting proof</Eyebrow><h3>The answer appears here.</h3><p>No name, email, date of birth or wallet history is requested by the verifier.</p><div className="privacy-list"><span><Check weight="light" />Ticket valid</span><span><Check weight="light" />Correct event</span><span><Check weight="light" />Age eligible</span><span><Check weight="light" />Not previously used</span></div></>}</div></Bezel></Reveal>
      </div>
    </section>
  );
}

function EntryProofModal({ proof, dataUrl, onClose }: { proof: EntryProofPayload; dataUrl: string; onClose: () => void }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const timer = window.setInterval(() => setNow(Date.now()), 250); return () => window.clearInterval(timer); }, []);
  const seconds = Math.max(0, Math.ceil((proof.expiresAt - now) / 1000));
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Temporary entry proof"><Bezel className="proof-modal"><div className="proof-modal-core"><button className="modal-close" onClick={onClose} aria-label="Close"><X weight="light" /></button><Eyebrow>Private entry proof</Eyebrow><h2>Hold steady.<br /><em>You’re almost in.</em></h2><div className={`qr-shell ${seconds === 0 ? 'expired' : ''}`}><img src={dataUrl} alt="Temporary zkTicket entry QR code" />{seconds === 0 && <span>Expired</span>}</div><div className="countdown"><span>{seconds.toString().padStart(2, '0')}s</span><div><i style={{ transform: `scaleX(${seconds / (QR_TTL_MS / 1000)})` }} /></div></div><SecondaryButton className="copy-proof" disabled={seconds === 0} onClick={() => copyText(encodeEntryProof(proof))} icon={<Copy weight="light" />}>Copy verifier payload</SecondaryButton><details className="proof-payload"><summary>Manual verifier payload</summary><code>{encodeEntryProof(proof)}</code></details><p>The QR reveals no identity. Its one-time secret is committed on Midnight and expires locally after 60 seconds.</p><small>Ticket #{proof.ticketId} · {NETWORK_ID}</small></div></Bezel></div>;
}

function EmptyState({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return <Bezel className="empty-bezel"><div className="empty-state"><span>{icon}</span><h3>{title}</h3><p>{body}</p></div></Bezel>;
}

function NoticeToast({ notice }: { notice?: Notice }) {
  if (!notice) return null;
  return <div className={`notice-toast ${notice.tone}`} role="status" aria-live="polite">{notice.tone === 'working' ? <span className="spinner" /> : notice.tone === 'success' ? <CheckCircle weight="light" /> : <WarningCircle weight="light" />}<span>{notice.message}</span></div>;
}

export default function App() {
  const managerRef = useRef<BrowserZkTicketManager | undefined>(undefined);
  const [api, setApi] = useState<ZkTicketAPI>();
  const [wallet, setWallet] = useState<WalletSummary>();
  const [state, setState] = useState(EMPTY_STATE);
  const [route, setRoute] = useState<AppRoute>(() => routeFromPath(window.location.pathname));
  const [walletOpen, setWalletOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>();
  const [contractAddress, setContractAddress] = useState(() => localStorage.getItem('zkticket:last-contract') || DEFAULT_CONTRACT || '');
  const [entryProof, setEntryProof] = useState<{ payload: EntryProofPayload; dataUrl: string }>();
  const [walletOptions, setWalletOptions] = useState<WalletOption[]>(() => listCompatibleWallets(window.midnight));
  const [walletId, setWalletId] = useState(() => listCompatibleWallets(window.midnight)[0]?.id ?? '');

  const navigate = (next: AppRoute) => {
    const path = ROUTE_PATHS[next];
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPopState = () => { setRoute(routeFromPath(window.location.pathname)); window.scrollTo({ top: 0 }); };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const label = route === 'landing' ? 'Private event access' : route === 'dashboard' ? 'Dashboard' : route === 'events' ? 'Explore' : route === 'tickets' ? 'My tickets' : route === 'organizer' ? 'Organizer studio' : 'Door verifier';
    document.title = `zkTicket — ${label}`;
  }, [route]);

  useEffect(() => {
    const refreshWallets = () => {
      const options = listCompatibleWallets(window.midnight);
      setWalletOptions((current) => current.map((option) => option.id).join('|') === options.map((option) => option.id).join('|') ? current : options);
      setWalletId((current) => options.some((option) => option.id === current) ? current : options[0]?.id ?? '');
    };
    refreshWallets();
    const interval = window.setInterval(refreshWallets, 250);
    const stop = window.setTimeout(() => window.clearInterval(interval), 5_000);
    return () => { window.clearInterval(interval); window.clearTimeout(stop); };
  }, []);

  const createManager = async (attempt: WalletConnectionAttempt): Promise<BrowserZkTicketManager> => {
    const { BrowserZkTicketManager } = await import('./browser-manager');
    const manager = new BrowserZkTicketManager(attempt.wallet, attempt.connectedAPI);
    managerRef.current = manager;
    return manager;
  };

  const requireManager = (): BrowserZkTicketManager => {
    if (!managerRef.current) throw new Error('Connect your Midnight wallet before managing the privacy-key backup.');
    return managerRef.current;
  };

  useEffect(() => {
    if (!api) return;
    const subscription = api.state$.subscribe({ next: setState, error: (error) => setNotice({ tone: 'error', message: friendlyError(error) }) });
    return () => subscription.unsubscribe();
  }, [api]);

  useEffect(() => {
    if (!notice || notice.tone === 'working') return;
    const timer = window.setTimeout(() => setNotice(undefined), 6_000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const connect = async (deploy: boolean) => {
    let attempt: WalletConnectionAttempt;
    try {
      attempt = beginWalletConnection(window.midnight, NETWORK_ID, walletId || undefined);
    } catch (error) {
      setNotice({ tone: 'error', message: friendlyError(error) });
      return;
    }
    setBusy(true); setNotice({ tone: 'working', message: deploy ? 'Approve the wallet request to deploy on Midnight preprod…' : 'Approve the connection request in your Midnight wallet…' });
    try {
      const manager = await createManager(attempt);
      const [connectedApi, summary] = await Promise.all([
        deploy ? manager.deploy() : manager.join(contractAddress.trim()),
        manager.getWalletSummary(),
      ]);
      const address = connectedApi.deployedContractAddress;
      setApi(connectedApi); setWallet(summary); setContractAddress(address);
      localStorage.setItem('zkticket:last-contract', address);
      setWalletOpen(false);
      navigate('dashboard');
      setNotice({ tone: 'success', message: deploy ? 'Protocol deployed on Midnight preprod.' : 'Protocol connected and state synchronized.' });
    } catch (error) { managerRef.current = undefined; setNotice({ tone: 'error', message: friendlyError(error) }); }
    finally { setBusy(false); }
  };

  const runTransaction = async <T,>(label: string, action: () => Promise<T>): Promise<TransactionSuccess<T> | undefined> => {
    setNotice({ tone: 'working', message: `${label}…` });
    try {
      const result = await action();
      setNotice({ tone: 'success', message: `${label} confirmed on ${NETWORK_ID}.` });
      return { value: result };
    } catch (error) {
      setNotice({ tone: 'error', message: friendlyError(error) });
      return undefined;
    }
  };

  const onBuy = (event: EventView, tier: TicketTier) => {
    if (!api) return;
    void runTransaction(`Purchasing ${tier === TicketTier.PREMIUM ? 'premium' : 'general'} access`, () => api.buyTicket(event.id, tier));
  };

  const onProof = async (ticket: TicketView, event: EventView, secret: Uint8Array) => {
    if (!api) return;
    const payload: EntryProofPayload = {
      v: 1,
      network: NETWORK_ID,
      contract: api.deployedContractAddress,
      ticketId: ticket.id,
      eventId: event.id,
      secret: Array.from(secret, (byte) => byte.toString(16).padStart(2, '0')).join(''),
      expiresAt: Date.now() + QR_TTL_MS,
    };
    const { default: QRCode } = await import('qrcode');
    const dataUrl = await QRCode.toDataURL(encodeEntryProof(payload), { width: 520, margin: 2, color: { dark: '#07100c', light: '#f2f8ef' }, errorCorrectionLevel: 'M' });
    setEntryProof({ payload, dataUrl });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header connected={!!api} route={route} wallet={wallet} onNavigate={navigate} onConnect={() => setWalletOpen(true)} />
      {route === 'landing' ? <Landing connected={!!api} onConnect={() => setWalletOpen(true)} onDashboard={() => navigate('dashboard')} /> : !api || !wallet ? <AccessGate onConnect={() => setWalletOpen(true)} /> : <main id="main-content" className="product-main">
        {route === 'dashboard' && <DashboardHome state={state} wallet={wallet} contractAddress={contractAddress} onNavigate={navigate} />}
        {route === 'events' && <EventsView events={state.events} onBuy={onBuy} />}
        {route === 'tickets' && <TicketsView tickets={state.tickets} events={state.events} api={api} runTransaction={runTransaction} onProof={(ticket, event, secret) => void onProof(ticket, event, secret)} onExport={(passphrase) => requireManager().exportPrivacyKey(passphrase)} onImport={async (backup, passphrase) => { await requireManager().importPrivacyKey(backup, passphrase); window.location.reload(); }} />}
        {route === 'organizer' && <OrganizerView events={state.events} api={api} wallet={wallet} runTransaction={runTransaction} />}
        {route === 'verifier' && <VerifierView api={api} contractAddress={contractAddress} events={state.events} runTransaction={runTransaction} />}
      </main>}
      {route === 'landing' && <footer><Brand /><p>The venue learns that you’re allowed inside — not who you are.</p><span>Compact 0.23 · Midnight {NETWORK_ID}</span></footer>}
      <WalletModal open={walletOpen} onClose={() => setWalletOpen(false)} address={contractAddress} setAddress={setContractAddress} busy={busy} onJoin={() => void connect(false)} onDeploy={() => void connect(true)} walletOptions={walletOptions} walletId={walletId} setWalletId={setWalletId} />
      <NoticeToast notice={notice} />
      {entryProof && <EntryProofModal proof={entryProof.payload} dataUrl={entryProof.dataUrl} onClose={() => setEntryProof(undefined)} />}
    </div>
  );
}
