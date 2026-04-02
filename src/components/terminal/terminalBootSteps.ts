import { SSH_HOST } from "@/lib/terminalConstants";

export interface BootStep {
  text: string;
  delay: number;
  isCommand: boolean;
}

export function getSshBootSteps(): BootStep[] {
  return [
    {
      text: `ssh -i "~/.ssh/lucas-key.pem" ec2-user@${SSH_HOST}`,
      delay: 1200,
      isCommand: true,
    },
    {
      text: `The authenticity of host '${SSH_HOST}' cannot be established.\nED25519 key fingerprint is SHA256:dLucasSong/xK9mZ3HvQpR2wN7cBfYtUe.\nThis key is not known by any other names.\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes`,
      delay: 1400,
      isCommand: false,
    },
    {
      text: `Warning: Permanently added '${SSH_HOST}' (ED25519) to the list of known hosts.`,
      delay: 800,
      isCommand: false,
    },
    {
      text: `\n       __|  __|_  )\n       _|  (     /   Amazon Linux 2\n      ___|\\__|___|  \n\nhttps://aws.amazon.com/amazon-linux-2/\n`,
      delay: 1000,
      isCommand: false,
    },
    {
      text: `Last login: Wed Mar 25 10:42:03 2026 from 68.174.55.203`,
      delay: 600,
      isCommand: false,
    },
    { text: `./portfolio.sh`, delay: 1000, isCommand: true },
    { text: "Loading Lucas Song's portfolio... done.", delay: 700, isCommand: false },
  ];
}
