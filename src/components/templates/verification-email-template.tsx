import { AppLogoUrl, AppTitle } from "@/lib/app-constants";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

type VerificationEmailTemplateProps = {
  confirmationLink: string;
  email: string;
};

export const VerificationEmailTemplate = ({
  confirmationLink,
}: VerificationEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm your email address</Preview>
      <Body style={main}>
        <Tailwind>
          <Container style={container}>
            <Section
              style={logoContainer}
              className="flex items-center gap-x-2"
            >
              <Img
                src={AppLogoUrl}
                width="50"
                height="50"
                alt={AppTitle}
                className="object-cover rounded-full"
              />
              <Text>{AppTitle}</Text>
            </Section>
            <Heading style={h1}>Confirm your email address</Heading>
            <Text style={heroText}>
              Click on the confirmation link below to verify your email address
              and we&apos;ll help you get signed in.
            </Text>

            <Section style={codeBox}>
              <Link href={confirmationLink}>{confirmationLink}</Link>
            </Section>

            <Text style={text}>
              If you didn&apos;t request this email, there&apos;s nothing to
              worry about, you can safely ignore it.
            </Text>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, &apos;Segoe UI&apos;, &apos;Roboto&apos;, &apos;Oxygen&apos;, &apos;Ubuntu&apos;, &apos;Cantarell&apos;, &apos;Fira Sans&apos;, &apos;Droid Sans&apos;, &apos;Helvetica Neue&apos;, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
