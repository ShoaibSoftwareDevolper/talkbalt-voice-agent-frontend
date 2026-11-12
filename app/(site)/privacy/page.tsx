import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteMotion } from '@/components/motion/site-motion';
import { PageHero } from '@/components/site/site-chrome';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy · Talkbalt',
  description: 'What Talkbalt collects when businesses use it and when callers talk to an AI receptionist, why, who processes it, and the choices you have.',
  alternates: { canonical: '/privacy' },
};

const UPDATED = '12 November 2026';

function Contact() {
  return CONTACT_EMAIL ? (
    <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
      {CONTACT_EMAIL}
    </a>
  ) : (
    <span>the contact email that will be listed here before launch</span>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="flex flex-col gap-4 text-lg leading-relaxed text-foreground/75 [&_li]:pl-1 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6">
        {children}
      </div>
    </section>
  );
}

/**
 * Written to match what the product actually does (see CONTEXT.md and the platform/voice code):
 * if a feature changes what is collected or who processes it, update this page in the same change.
 */
export default function PrivacyPage() {
  return (
    <>
      <SiteMotion />
      <PageHero title="Privacy Policy">
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
          The short version: we collect what is needed to answer calls and book appointments, we do not sell it, we
          do not use advertising trackers, and you can ask us to delete it.
        </p>
        <p className="text-sm text-muted-foreground">Last updated {UPDATED}</p>
      </PageHero>

      <article className="flex w-full max-w-2xl flex-col gap-12 px-3 py-6 sm:py-10">
        <Section title="Who we are and who this covers">
          <p>
            Talkbalt is software that gives businesses an AI receptionist. Customers talk to it by voice through a
            business link or a call button on a website, and it answers questions and books appointments.
          </p>
          <p>This policy covers three groups of people:</p>
          <ul>
            <li><strong>Business users</strong>, who create a Talkbalt account to run a receptionist.</li>
            <li><strong>Callers</strong>, who talk to a business receptionist.</li>
            <li><strong>Visitors</strong>, who read this website or a business public page.</li>
          </ul>
          <p>
            For business accounts, Talkbalt decides how account information is used. When you call a business, that
            business decides why your information is collected, and Talkbalt processes it on its behalf to run the
            receptionist. The business can see your booking and your call.
          </p>
        </Section>

        <Section title="What we collect">
          <p><strong>From business users</strong></p>
          <ul>
            <li>Your name, email address and business name.</li>
            <li>Your password, stored only as a one way scrambled value (a hash). We cannot read it.</li>
            <li>The business details you enter: address, contact email, about text, FAQs, services, products, prices, opening hours, greeting, language and voice choice, and logo.</li>
          </ul>
          <p><strong>From callers</strong></p>
          <ul>
            <li>Your voice while the call is active, so it can be understood and answered.</li>
            <li>A written transcript of the call.</li>
            <li>An audio recording of the call, if recording is turned on for that business.</li>
            <li>The booking details you give: your name, phone number, the service, and the date and time.</li>
            <li>Technical details about the call, such as when it started, how long it lasted, how it ended and how fast replies were.</li>
          </ul>
          <p><strong>From visitors</strong></p>
          <ul>
            <li>Your IP address, used for a short time to stop abuse, for example too many calls or sign in attempts from one place. These records expire within an hour.</li>
            <li>A login cookie, only if you sign in to a business account.</li>
          </ul>
          <p>We do not ask callers for identity card numbers, addresses, payment details or medical history.</p>
        </Section>

        <Section title="How we use it">
          <ul>
            <li>To run the receptionist: understand the caller, answer from the business information and book appointments.</li>
            <li>To show each business its bookings, calls and transcripts, so it can confirm, follow up and improve its answers.</li>
            <li>To keep the service safe: limit abuse, end abusive calls and protect accounts.</li>
            <li>To keep the service working well, using technical call details such as reply speed and errors.</li>
          </ul>
          <p>
            We do not sell personal information. We do not use calls, transcripts or bookings for advertising. We do
            not share one business information with another business.
          </p>
        </Section>

        <Section title="AI and automated processing">
          <p>
            Calls are handled by software. Speech recognition turns the caller voice into text, an AI language model
            decides the reply from the business information, and a text to speech voice speaks it. The receptionist
            says honestly that it is an AI if a caller asks.
          </p>
          <p>
            Some checks are automatic: whether the business is open at the time asked for, whether the time has passed,
            whether the slot is already booked and whether a phone number is complete. These checks only decide whether
            a booking can be made. Nothing else about you is decided automatically.
          </p>
        </Section>

        <Section title="Who processes it for us">
          <p>
            We use a small number of service providers to run calls and store data. Each one receives only what it needs
            for its part of the job:
          </p>
          <ul>
            <li><strong>LiveKit</strong>: connects the call, carries the audio, provides the receptionist voice and, if turned on, records the call.</li>
            <li><strong>Deepgram</strong>: speech recognition, turning speech into text.</li>
            <li><strong>Groq</strong>: runs the AI language model that writes the receptionist replies.</li>
            <li><strong>Cartesia</strong> (through LiveKit): the receptionist voice.</li>
            <li><strong>Cloudflare</strong>: stores call recordings, where recording is turned on.</li>
            <li><strong>Cloudinary</strong>: stores business logos.</li>
          </ul>
          <p>
            Some of these providers process data outside Pakistan. We may also share information if the law requires
            it, or to protect people from harm.
          </p>
        </Section>

        <Section title="Cookies and browser storage">
          <ul>
            <li><strong>tb_session</strong>: a login cookie set only when a business user signs in. It keeps you signed in for up to 30 days, or until you log out. It cannot be read by scripts on the page.</li>
            <li>
              On a business public page opened inside apps like Instagram or Facebook, your browser may keep a temporary
              note that it already offered to open the page in your normal browser, so it does not ask twice. It is
              cleared when you close the tab.
            </li>
          </ul>
          <p>We do not use advertising cookies, analytics trackers or social media pixels.</p>
        </Section>

        <Section title="How long we keep it">
          <ul>
            <li>Business account information: while the account is open.</li>
            <li>Bookings, transcripts and recordings: while the business account is open, unless the business or the caller asks us to delete them sooner.</li>
            <li>Abuse prevention records based on IP address: up to one hour.</li>
            <li>Login sessions: up to 30 days, or until you log out.</li>
          </ul>
          <p>When an account is closed, we delete its information unless the law requires us to keep it.</p>
        </Section>

        <Section title="How we protect it">
          <ul>
            <li>Passwords and login tokens are stored only in scrambled (hashed) form.</li>
            <li>Each business data is kept separate from every other business at the database level.</li>
            <li>Phone numbers are read back to callers before booking, so wrong numbers are not stored.</li>
            <li>Access to business dashboards requires signing in.</li>
          </ul>
          <p>No system is perfectly secure. If we learn of a breach that affects you, we will tell you and the business concerned.</p>
        </Section>

        <Section title="Your choices">
          <p>
            <strong>If you called a business</strong>, you can ask that business, or us, to see, correct or delete
            your booking, transcript or recording. You can also simply not give your phone number, in which case no
            booking is made.
          </p>
          <p>
            <strong>If you have a business account</strong>, you can change your business information at any time in
            your dashboard, and ask us to close your account and delete its data.
          </p>
          <p>
            To make a request, contact us at <Contact />. We will reply within 30 days. We may ask you to confirm who
            you are so we do not give your information to someone else.
          </p>
        </Section>

        <Section title="Children">
          <p>
            Business accounts are for adults. The receptionist is meant for customers booking appointments; children
            should call with a parent or guardian.
          </p>
        </Section>

        <Section title="The law in Pakistan">
          <p>
            Talkbalt is built for businesses in Pakistan. Pakistan does not yet have a single, comprehensive data
            protection law in force, and the Personal Data Protection Bill is still being finalised. We follow the
            principles that bill is expected to include, such as collecting only what is needed, telling people how
            their data is used and letting them ask for it to be deleted, and we will update this policy when the law
            changes.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we change what we collect or who processes it, we will update this page and the date at the top. For
            significant changes, we will also tell business users by email.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about privacy: <Contact />. You can also read <Link href="/about" className="underline underline-offset-4">about Talkbalt</Link>.
          </p>
        </Section>
      </article>
    </>
  );
}
