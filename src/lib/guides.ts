export interface Guide {
  slug: string;
  name: string;
  category: string;
  /** Typical monthly cost used in "what you'll save" messaging. */
  typicalMonthly: number;
  difficulty: "easy" | "medium" | "hard";
  /** One-line summary shown in cards and meta descriptions. */
  summary: string;
  /** Ordered steps for the primary (usually online) cancellation path. */
  steps: string[];
  /** Alternate path, e.g. phone or in-person, when one exists. */
  altMethod?: { title: string; steps: string[] };
  /** What the retention flow will throw at you, so you're ready. */
  retentionTraps?: string[];
  /** Good-to-know footnotes: refunds, timing, gotchas. */
  notes?: string[];
  phone?: string;
  cancelUrl?: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "netflix",
    name: "Netflix",
    category: "Streaming",
    typicalMonthly: 17.99,
    difficulty: "easy",
    summary:
      "Cancel online in under a minute — no phone call, no retention maze. You keep access until the end of your billing period.",
    steps: [
      "Sign in to netflix.com in a browser (you can't cancel inside the mobile app if you were billed by Apple/Google).",
      "Click your profile icon → Account.",
      'Under "Membership & Billing", click "Cancel Membership".',
      'Confirm with "Finish Cancellation".',
    ],
    retentionTraps: [
      "Netflix may offer a cheaper ad-supported plan instead of cancelling — decline it if you want out entirely.",
    ],
    notes: [
      "If you signed up through Apple, cancel via iPhone Settings → your name → Subscriptions instead.",
      "Your viewing history and profiles are kept for 10 months, so rejoining later is painless.",
    ],
    cancelUrl: "https://www.netflix.com/cancelplan",
  },
  {
    slug: "spotify",
    name: "Spotify Premium",
    category: "Music",
    typicalMonthly: 11.99,
    difficulty: "easy",
    summary:
      "Cancel from your account page on the web — the mobile app hides the option. You drop to the free ad-supported tier, keeping playlists.",
    steps: [
      "Go to spotify.com/account in a browser and log in.",
      'Under "Your plan", click "Change plan".',
      'Scroll to "Cancel Premium" and click "Cancel Premium".',
      "Confirm. You keep Premium until the end of the current billing cycle, then drop to Free.",
    ],
    retentionTraps: [
      "Spotify will offer a discounted or paused plan mid-flow — keep clicking through if you want to cancel.",
    ],
    notes: [
      "Your playlists, saved songs, and followers survive on the free tier.",
      "Billed through a bundle (e.g. Hulu promo)? Cancel from whichever service bills your card.",
    ],
    cancelUrl: "https://www.spotify.com/account/subscription/",
  },
  {
    slug: "amazon-prime",
    name: "Amazon Prime",
    category: "Shopping",
    typicalMonthly: 11.58,
    difficulty: "medium",
    summary:
      "Cancellable online, but Amazon routes you through several 'are you sure' screens. Unused periods are often refundable.",
    steps: [
      'On amazon.com, go to Accounts & Lists → "Prime Membership".',
      'Click "Manage membership" → "Update, cancel and more" → "End membership".',
      "Amazon shows a series of reminder screens about benefits you'll lose — keep choosing to continue cancelling.",
      'Choose whether to end now (possible partial refund) or on your renewal date, then confirm "Cancel my benefits".',
    ],
    retentionTraps: [
      "Multiple full-page interstitials listing benefits you'll lose — each has a small 'continue to cancel' link.",
      "An offer to switch to monthly billing or pause instead of cancelling.",
    ],
    notes: [
      "If you haven't used Prime benefits since the last charge, you're generally entitled to a full refund of that charge.",
      "In the US you can also cancel by chatting with customer service and simply saying 'cancel Prime'.",
    ],
    cancelUrl: "https://www.amazon.com/mc/pipelines/cancellation",
  },
  {
    slug: "planet-fitness",
    name: "Planet Fitness",
    category: "Fitness",
    typicalMonthly: 15,
    difficulty: "hard",
    summary:
      "The infamous one: most locations require an in-person visit or a certified letter. Plan around your billing date (usually the 17th).",
    steps: [
      "Find your home club (the club where you signed up) — cancellation must go through that location.",
      "Option A: Visit the front desk of your home club and ask for a cancellation form. Fill it out and keep a copy or photo of the signed form.",
      "Option B: Send a certified letter (return receipt requested) to your home club including your full name, date of birth, PF member ID, address, and a clear request to cancel.",
      "Cancel before the 10th of the month to avoid the monthly billing on the 17th; before the 25th to avoid an upcoming annual fee (usually billed around the 1st).",
      "Watch your bank statement the following month to confirm billing has stopped.",
    ],
    retentionTraps: [
      "Staff may offer to downgrade or freeze your membership instead — a freeze does not stop the annual fee.",
      "Some clubs claim only a manager can process it; ask them to date-stamp your form anyway and photograph it.",
    ],
    notes: [
      "A small number of states/clubs support cancellation via the PF app or online — check the app's 'Manage membership' first; you might get lucky.",
      "If you've moved 25+ miles from your home club, many membership agreements allow cancellation by mail with proof of your new address.",
    ],
  },
  {
    slug: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    category: "Software",
    typicalMonthly: 59.99,
    difficulty: "hard",
    summary:
      "Watch out for the early-termination fee: annual-paid-monthly plans charge ~50% of the remaining months. There's a well-known workaround.",
    steps: [
      "Sign in at account.adobe.com → Plans.",
      'Click "Manage plan" → "Cancel your plan".',
      "Adobe shows your early-termination fee (ETF) if you're on an 'Annual, paid monthly' plan mid-term — note the amount before confirming.",
      "Pick a reason, click through the discount offers, and confirm the cancellation.",
    ],
    altMethod: {
      title: "Avoid the early-termination fee (plan-switch trick)",
      steps: [
        "Instead of cancelling, 'change' your plan to any other plan (e.g. Photography). Switching waives the remaining commitment on the old plan.",
        "A new 14-day cancellation window opens on the new plan the moment you switch.",
        "Cancel the new plan within those 14 days for a full refund — no ETF.",
      ],
    },
    retentionTraps: [
      "Two or three screens offering 1–2 free months or a discount before the final confirm button.",
      "The ETF itself pressures people into staying — use the plan-switch method above instead.",
    ],
    notes: [
      "Cancel within 14 days of any purchase or renewal for a full refund.",
      "Adobe's chat support can also cancel and will often waive the ETF if you mention financial hardship or the plan-switch policy.",
    ],
    cancelUrl: "https://account.adobe.com/plans",
  },
  {
    slug: "gym-membership",
    name: "Any Gym Membership",
    category: "Fitness",
    typicalMonthly: 40,
    difficulty: "hard",
    summary:
      "The general playbook for gyms that make quitting hard: paper trail, certified mail, and your state's health-club cancellation laws.",
    steps: [
      "Re-read your membership agreement (ask the gym for a copy — they must provide it). Find the cancellation clause: notice period, method, and any fee.",
      "Follow the stated method exactly, in writing. If in person, get a signed/dated copy of the form. If by mail, use certified mail with return receipt.",
      "Include: full name, member ID, address, phone, and an explicit sentence — 'I am cancelling my membership effective [date]. Stop all billing.'",
      "Keep every receipt. If billing continues past the notice period, dispute the charges with your bank and attach your proof.",
    ],
    retentionTraps: [
      "Verbal 'ok, you're all set' with no paperwork — always get it in writing.",
      "Offers to freeze instead of cancel (freezes often still bill annual fees).",
    ],
    notes: [
      "Many US states have health-club statutes letting you cancel penalty-free if you move a certain distance, become disabled, or the gym closes/relocates.",
      "If the gym uses ABC Fitness/ABC Financial for billing, you can often cancel through abcfitness.com or by calling the billing company directly.",
    ],
  },
  {
    slug: "disney-plus",
    name: "Disney+",
    category: "Streaming",
    typicalMonthly: 9.99,
    difficulty: "easy",
    summary:
      "Quick online cancellation from your account page. Bundles (Disney+/Hulu/ESPN+) cancel together from the Disney side.",
    steps: [
      "Log in at disneyplus.com in a browser.",
      "Click your profile → Account.",
      'Under Subscription, select your plan, then click "Cancel Subscription".',
      "Click through the survey/offers and confirm.",
    ],
    notes: [
      "Billed via Apple, Google, Amazon, Hulu, or Verizon? You must cancel through that biller instead.",
      "Access continues until the end of the paid period; no partial refunds.",
    ],
    cancelUrl: "https://www.disneyplus.com/account",
  },
  {
    slug: "hulu",
    name: "Hulu",
    category: "Streaming",
    typicalMonthly: 9.99,
    difficulty: "easy",
    summary:
      "Cancel from your Hulu account page — or consider the 'pause for up to 12 weeks' option if you just want a break.",
    steps: [
      "Go to hulu.com/account and log in (web, not the app).",
      'Under "Your Subscription", click "Cancel".',
      "Hulu offers a pause instead — choose 'Continue to Cancel' if you want out.",
      "Confirm cancellation.",
    ],
    retentionTraps: ["A pause offer and sometimes a discount interstitial before the final confirmation."],
    notes: ["Part of a Disney bundle? Manage it from your Disney+ account instead."],
    cancelUrl: "https://secure.hulu.com/account",
  },
  {
    slug: "max",
    name: "Max (HBO)",
    category: "Streaming",
    typicalMonthly: 16.99,
    difficulty: "easy",
    summary:
      "Cancel where you subscribed: max.com for direct billing, or your app store / TV provider otherwise.",
    steps: [
      "Log in at max.com in a browser.",
      "Click your profile → Subscription.",
      'Click "Cancel Subscription" and confirm.',
      "If you don't see a cancel option, you're billed by a third party (Apple, Google, Amazon, Roku, or your cable provider) — cancel there.",
    ],
    notes: ["Access lasts until the end of the billing period. Re-subscribing later keeps your watch history."],
    cancelUrl: "https://www.max.com",
  },
  {
    slug: "youtube-premium",
    name: "YouTube Premium",
    category: "Streaming",
    typicalMonthly: 13.99,
    difficulty: "easy",
    summary:
      "Cancel (or pause up to 6 months) from your YouTube purchases page. iOS signups must cancel through Apple.",
    steps: [
      "Go to youtube.com/paid_memberships in a browser.",
      'Click "Manage membership".',
      'Click "Deactivate" → choose "Pause" or "Cancel".',
      "Confirm. Premium features last until the period you've paid for ends.",
    ],
    notes: [
      "Signed up on an iPhone at the higher iOS price? Cancel in iPhone Settings → Subscriptions, then re-subscribe on the web for the cheaper rate if you ever return.",
    ],
    cancelUrl: "https://www.youtube.com/paid_memberships",
  },
  {
    slug: "apple-subscriptions",
    name: "Apple / App Store subscriptions",
    category: "Bundle",
    typicalMonthly: 9.99,
    difficulty: "easy",
    summary:
      "One place controls every subscription billed through Apple — including third-party apps you forgot about. Worth auditing quarterly.",
    steps: [
      "On iPhone/iPad: Settings → your name → Subscriptions.",
      "Review the full Active list — this is where forgotten app subscriptions hide.",
      "Tap any subscription → Cancel Subscription → confirm.",
      "On a Mac: App Store → your name → Account Settings → Subscriptions → Manage.",
    ],
    notes: [
      "Cancelling stops the next charge; you keep access until the current period ends.",
      "Apple One bundles (TV+, Music, iCloud+, Arcade) cancel from the same screen — you can drop the bundle but keep individual services.",
      "Charged for something you never meant to renew? Request a refund at reportaproblem.apple.com.",
    ],
    cancelUrl: "https://apps.apple.com/account/subscriptions",
  },
  {
    slug: "audible",
    name: "Audible",
    category: "Books",
    typicalMonthly: 14.95,
    difficulty: "medium",
    summary:
      "Cancel on desktop web only (the app and mobile site hide it). Spend or note your credits first — unused credits vanish.",
    steps: [
      "USE YOUR CREDITS FIRST — they're lost when the membership ends.",
      "On desktop, sign in at audible.com (mobile browsers: request the desktop site).",
      'Go to Account Details → "Cancel membership" (small link near the bottom).',
      "Click through the retention offers (pause, discounted months) and confirm.",
    ],
    retentionTraps: [
      "A 'pause for 1–3 months' offer, then a '$7.95/mo for 3 months' style discount before the final confirm.",
      "Sometimes Audible offers a free credit to stay — grab it and cancel next month if you like.",
    ],
    notes: [
      "Audiobooks you've purchased with credits are yours forever, even after cancelling.",
      "Billed through Apple/Google? Cancel in the respective app store instead.",
    ],
    cancelUrl: "https://www.audible.com/account/overview",
  },
  {
    slug: "paramount-plus",
    name: "Paramount+",
    category: "Streaming",
    typicalMonthly: 7.99,
    difficulty: "easy",
    summary: "Standard streaming cancel flow from the account page on the web.",
    steps: [
      "Sign in at paramountplus.com in a browser.",
      "Click your profile → Account.",
      'Scroll to "Subscription & Billing" and click "Cancel Subscription".',
      "Confirm through the offer screens.",
    ],
    notes: ["Subscribed via Apple/Google/Amazon/Roku? Cancel through that store instead."],
    cancelUrl: "https://www.paramountplus.com/account/",
  },
  {
    slug: "peacock",
    name: "Peacock",
    category: "Streaming",
    typicalMonthly: 7.99,
    difficulty: "easy",
    summary: "Cancel from Plans & Payment in your Peacock account. Watch for win-back discount emails after.",
    steps: [
      "Sign in at peacocktv.com in a browser.",
      "Click your profile → Plans & Payment.",
      '"Change or cancel plan" → "Cancel plan".',
      "Click through the downgrade offers and confirm.",
    ],
    notes: ["Peacock frequently sends $1.99/mo win-back offers a few weeks after you cancel — worth waiting for if you'll return."],
    cancelUrl: "https://www.peacocktv.com/account/plans",
  },
  {
    slug: "xbox-game-pass",
    name: "Xbox Game Pass",
    category: "Gaming",
    typicalMonthly: 19.99,
    difficulty: "easy",
    summary:
      "Cancel (and turn off recurring billing) from your Microsoft account services page.",
    steps: [
      "Go to account.microsoft.com/services and sign in.",
      "Find Game Pass → Manage.",
      'Click "Cancel subscription" (or "Turn off recurring billing" to just stop future charges).',
      "Confirm. If you cancel within 30 days of a charge you may get a prorated refund.",
    ],
    notes: ["Turning off recurring billing keeps your remaining time; cancelling may end it immediately with a refund."],
    cancelUrl: "https://account.microsoft.com/services",
  },
  {
    slug: "playstation-plus",
    name: "PlayStation Plus",
    category: "Gaming",
    typicalMonthly: 6.66,
    difficulty: "easy",
    summary: "Turn off auto-renewal from your PlayStation account — web or console.",
    steps: [
      "On the web: sign in at playstation.com → your avatar → Subscriptions Management.",
      'Find PlayStation Plus → "Turn Off Auto-Renew".',
      "On PS5: Settings → Users and Accounts → Account → Payment and Subscriptions → Subscriptions.",
      "Confirm — you keep benefits until the paid period ends.",
    ],
    notes: ["Games you 'got free' with Plus become unplayable if your membership lapses, but purchased games are unaffected."],
    cancelUrl: "https://www.playstation.com/en-us/support/subscriptions/cancel-playstation-plus/",
  },
  {
    slug: "linkedin-premium",
    name: "LinkedIn Premium",
    category: "Career",
    typicalMonthly: 39.99,
    difficulty: "medium",
    summary:
      "Cancel from Premium subscription settings on desktop. Do it at least one day before renewal — LinkedIn is strict about timing.",
    steps: [
      "On desktop, click your photo (Me) → Settings & Privacy.",
      'Go to "Account preferences" → "Subscriptions & payments" → "Manage Premium account".',
      'Click "Cancel subscription" and continue through the offers.',
      "Confirm cancellation and screenshot the confirmation.",
    ],
    retentionTraps: [
      "Free-month or discount offers mid-flow.",
      "LinkedIn often grants a 'we'll keep your Premium until X' screen — verify the end date matches your expectation.",
    ],
    notes: ["Started as a free trial? Cancel at least 24 hours before the trial ends to avoid the first charge."],
    cancelUrl: "https://www.linkedin.com/premium/manage",
  },
  {
    slug: "new-york-times",
    name: "The New York Times",
    category: "News",
    typicalMonthly: 25,
    difficulty: "hard",
    summary:
      "US subscribers can now cancel online (thanks to FTC pressure), but many accounts still get routed to chat or phone. Persistence wins.",
    steps: [
      "Log in at nytimes.com → click your account icon → Account.",
      'Go to "Subscription overview" → "Manage subscription" → look for "Cancel your subscription".',
      "If online cancel isn't offered, use the chat option and type 'cancel my subscription' — the bot escalates to an agent.",
      "Decline the discounted-rate offers (they'll usually offer ~$1/wk) and get an email confirmation.",
    ],
    altMethod: {
      title: "By phone",
      steps: [
        "Call 866-273-3612 (US customer care) during business hours.",
        "Say 'cancel subscription'; expect at least two retention offers.",
        "Ask for a confirmation number and email before hanging up.",
      ],
    },
    retentionTraps: [
      "Steep 'stay' discounts — often $4/mo for a year. If you'd keep it at that price, take the deal; that's the game.",
    ],
    notes: ["Games/Cooking/Athletic add-ons are separate subscriptions — check for those too."],
    phone: "866-273-3612",
  },
  {
    slug: "siriusxm",
    name: "SiriusXM",
    category: "Music",
    typicalMonthly: 9.99,
    difficulty: "hard",
    summary:
      "Historically phone/chat-only with aggressive retention. Online cancellation now exists for some plans; chat is the fastest path for the rest.",
    steps: [
      "Try online first: siriusxm.com → Account → Manage Your Account → look for 'Cancel Service'.",
      "If not offered, open the chat on the 'Cancel' support page and type 'cancel my subscription'.",
      "State clearly: 'Please cancel. I do not want a promotional rate.' Repeat as needed — agents are scripted to offer 3+ deals.",
      "Get the cancellation confirmation number and email; verify no further charges next cycle.",
    ],
    retentionTraps: [
      "$5/mo-for-12-months style offers, free months, and 'let me transfer you to a specialist' delays.",
      "If you accept a promo rate, calendar the promo end date — it jumps back to full price silently.",
    ],
    notes: ["Selling a car? Cancel or transfer the subscription — it doesn't end automatically with the car."],
    phone: "866-635-2349",
  },
  {
    slug: "dashpass",
    name: "DoorDash DashPass",
    category: "Food",
    typicalMonthly: 9.99,
    difficulty: "easy",
    summary: "Cancel in the app or website in a few taps. Cancel at least a day before renewal to be safe.",
    steps: [
      "In the DoorDash app: tap the account icon → Manage DashPass.",
      'Tap "End Subscription".',
      "Choose a reason, then confirm 'End DashPass'.",
      "Screenshot the confirmation screen.",
    ],
    notes: ["Annual DashPass refunds are prorated only in some cases — monthly plans simply run to the end of the period."],
    cancelUrl: "https://www.doordash.com/consumer/subscribe/manage/",
  },
  {
    slug: "tinder",
    name: "Tinder (Gold/Plus/Platinum)",
    category: "Dating",
    typicalMonthly: 24.99,
    difficulty: "medium",
    summary:
      "Deleting the app does NOT cancel — the #1 dating-app billing trap. Cancel wherever you're billed: Apple, Google, or Tinder directly.",
    steps: [
      "Figure out your biller: check whether charges say APPLE.COM/BILL, GOOGLE*Tinder, or Tinder directly.",
      "Apple: Settings → your name → Subscriptions → Tinder → Cancel.",
      "Google: Play Store → profile → Payments & subscriptions → Subscriptions → Tinder → Cancel.",
      "Web/direct: tinder.com → profile → Manage Payment Account → Cancel Subscription.",
    ],
    notes: [
      "Deleting your Tinder *account* also does not cancel an app-store subscription — cancel the subscription first, then delete.",
      "The same trap applies to Bumble, Hinge, and Match — always cancel at the app store level if that's who bills you.",
    ],
  },
  {
    slug: "grammarly",
    name: "Grammarly Premium",
    category: "Software",
    typicalMonthly: 12,
    difficulty: "easy",
    summary: "Cancel from your account's subscription page; refunds are rare, so time it before renewal.",
    steps: [
      "Log in at account.grammarly.com/subscription.",
      'Click "Cancel Subscription" at the bottom of the page.',
      "Click through the discount offer and confirm.",
      "You keep Premium until the end of the paid period, then drop to the free tier.",
    ],
    notes: ["Annual plans renew in one lump sum — set a SubSentry reminder a week before."],
    cancelUrl: "https://account.grammarly.com/subscription",
  },
  {
    slug: "canva",
    name: "Canva Pro",
    category: "Software",
    typicalMonthly: 15,
    difficulty: "easy",
    summary: "Cancel from Billing & plans in settings. Your designs stay, but Pro assets in them lock.",
    steps: [
      "Log in at canva.com → gear icon (Settings).",
      'Go to "Billing & plans".',
      'Click "..." next to your plan → "Cancel subscription".',
      "Follow the prompts and confirm.",
    ],
    notes: ["Designs using Pro elements will show watermarks if you edit them after downgrading — export anything important first."],
    cancelUrl: "https://www.canva.com/settings/billing-and-teams",
  },
  {
    slug: "dropbox",
    name: "Dropbox Plus",
    category: "Storage",
    typicalMonthly: 11.99,
    difficulty: "medium",
    summary:
      "Cancel from your plan page — then deal with the real problem: being over the free 2 GB quota after downgrade.",
    steps: [
      "Sign in at dropbox.com → avatar → Settings → Plan.",
      'Click "Cancel plan" (bottom of the page).',
      "Click through 'keep plan' offers and confirm.",
      "Before the period ends, get your storage under 2 GB or export your files — over-quota accounts stop syncing new changes.",
    ],
    notes: ["Your files aren't deleted when you downgrade, but sync pauses until you're under quota."],
    cancelUrl: "https://www.dropbox.com/account/plan",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export const DIFFICULTY_META: Record<
  Guide["difficulty"],
  { label: string; className: string }
> = {
  easy: { label: "Easy · ~2 min", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  medium: { label: "Medium · ~10 min", className: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  hard: { label: "Hard · they fight back", className: "bg-rose-500/10 text-rose-400 border-rose-500/30" },
};
