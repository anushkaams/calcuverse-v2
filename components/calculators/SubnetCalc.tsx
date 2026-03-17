"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

const FAQS = [
  { question: "What is a subnet mask?", answer: "A subnet mask divides an IP address into network and host portions. /24 means the first 24 bits are the network, leaving 8 bits (254 usable hosts)." },
  { question: "What is CIDR notation?", answer: "CIDR (Classless Inter-Domain Routing) notation like /24 or /16 indicates how many bits make up the network portion of an IP address." },
  { question: "What is the difference between network and broadcast address?", answer: "The network address is the first IP in a subnet (host bits all 0). The broadcast address is the last IP (host bits all 1). Neither can be assigned to a host." },
  { question: "How many usable hosts does a /24 subnet have?", answer: "A /24 subnet has 256 addresses (2⁸) but only 254 usable hosts — the network address and broadcast address are reserved." },
];

export default function SubnetCalc() {
  const [ip, setIp] = useState("192.168.1.100");
  const [prefix, setPrefix] = useState("24");

  const isValidIP = (ip: string) => /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split(".").every(o => parseInt(o) >= 0 && parseInt(o) <= 255);

  let results: Record<string, string> = {};

  if (isValidIP(ip) && parseInt(prefix) >= 0 && parseInt(prefix) <= 32) {
    const p = parseInt(prefix);
    const ipParts = ip.split(".").map(Number);
    const ipInt = ipParts.reduce((acc, b) => (acc << 8) | b, 0) >>> 0;
    const maskInt = p === 0 ? 0 : (0xFFFFFFFF << (32 - p)) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
    const firstHostInt = networkInt + 1;
    const lastHostInt = broadcastInt - 1;
    const hosts = Math.pow(2, 32 - p);
    const usableHosts = hosts >= 2 ? hosts - 2 : 0;

    const toIP = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
    const toMask = (m: number) => [(m >>> 24) & 255, (m >>> 16) & 255, (m >>> 8) & 255, m & 255].join(".");

    results = {
      "Network Address": toIP(networkInt),
      "Subnet Mask": toMask(maskInt),
      "Broadcast Address": toIP(broadcastInt),
      "First Host": toIP(firstHostInt),
      "Last Host": toIP(lastHostInt),
      "Usable Hosts": usableHosts.toLocaleString(),
      "Total Addresses": hosts.toLocaleString(),
      "CIDR": `${toIP(networkInt)}/${p}`,
    };
  }

  return (
    <div className="space-y-6   py-6 px-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="field-label">IP Address</div>
          <input className="field-input font-mono" value={ip} onChange={e => setIp(e.target.value)} placeholder="192.168.1.0" />
        </div>
        <div>
          <div className="field-label">Prefix (/)</div>
          <input type="number" className="field-input font-mono" value={prefix} onChange={e => setPrefix(e.target.value)} min="0" max="32" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {[8, 16, 24, 25, 28, 30].map(p => (
          <button key={p} onClick={() => setPrefix(String(p))} className="px-2 py-1 text-xs rounded-full border font-mono" style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}>
            /{p}
          </button>
        ))}
      </div>

      {Object.keys(results).length > 0 && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          {Object.entries(results).map(([label, value]) => (
            <div key={label} className="flex justify-between px-4 py-2.5 border-b text-sm last:border-0" style={{ borderColor: "var(--border)" }}>
              <span style={{ color: "var(--text-secondary)" }}>{label}</span>
              <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      <CalculatorInfo faqs={FAQS} />
    </div>
  );
}
