"use client";
import { useState } from "react";
import CalculatorInfo from "@/components/CalculatorInfo";

export default function AgeCalculator() {
  const [dob, setDob] = useState("1990-01-01");
  const today = new Date();
  const birth = new Date(dob);
  let years = 0, months = 0, days = 0, totalDays = 0, nextBirthday = "";

  if (dob && !isNaN(birth.getTime())) {
    years = today.getFullYear() - birth.getFullYear();
    months = today.getMonth() - birth.getMonth();
    days = today.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      const prev = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) { years--; months += 12; }
    totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);
    const nextBD = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBD <= today) nextBD.setFullYear(today.getFullYear() + 1);
    const daysUntil = Math.ceil((nextBD.getTime() - today.getTime()) / 86400000);
    nextBirthday = daysUntil === 0 ? "Today! 🎉" : `${daysUntil} days`;
  }

  const valid = dob && !isNaN(birth.getTime()) && birth < today;

  const faqs = [
    {
      question: "How is my exact age calculated?",
      answer:
          "Your age is calculated by comparing your date of birth to today's date. We start by counting the number of full calendar years that have passed since you were born. Then we look at the remaining months after the last birthday, and finally the remaining days after the last full month. This gives you a precise breakdown such as '34 years, 5 months, and 12 days' rather than just a rounded number. This method mirrors how age is counted in everyday life and is consistent with how most official documents and legal systems define a person's age.",
    },
    {
      question: "Why does the total number of days differ from multiplying years by 365?",
      answer:
          "Not every year has 365 days - leap years have 366. A leap year occurs every 4 years, with some exceptions for century years. Our calculator accounts for every leap year between your birth date and today, so the total days figure is always accurate rather than an approximation. For example, someone who is 34 years old will have lived through roughly 8 or 9 leap years, adding extra days that a simple multiplication by 365 would miss entirely. This is why we calculate the difference in milliseconds directly from your birth date and today's date, ensuring complete accuracy.",
    },
    {
      question: "How are total months and total weeks calculated?",
      answer:
          "Total weeks is calculated by dividing your total days lived by 7, since every week is exactly 7 days. Total months uses an average month length of 30.44 days, which is derived from dividing 365.25 days (the average calendar year including leap years) by 12 months. This average accounts for the fact that calendar months vary in length between 28 and 31 days. Both values are marked as approximations because they use averages rather than counting each individual calendar month or week boundary you have crossed since birth.",
    },
    {
      question: "How does the next birthday countdown work?",
      answer:
          "We take your birth month and day and apply them to the current calendar year to find when your next birthday falls. If that date has already passed this year, we move the target to the same date next year. The countdown then shows the exact number of days remaining until that date. If today happens to be your birthday, the calculator celebrates with a 'Today! 🎉' message instead of a number. This makes it easy to plan ahead for celebrations, share your countdown with friends, or simply satisfy your curiosity about how far away your next birthday is.",
    },
    {
      question: "What if I was born on February 29 (leap day)?",
      answer:
          "If you were born on February 29, the calculator still works correctly for your total age calculation. In non-leap years, your birthday countdown will target March 1 as the nearest equivalent date. This is the standard convention used in most legal and official contexts worldwide, though some countries use February 28 instead. If you feel strongly about one convention over the other, keep in mind this only affects the birthday countdown display - your actual age in years, months, days, and total days lived is always calculated correctly regardless of which day your annual birthday is observed.",
    },
    {
      question: "Is this calculator useful for official or legal purposes?",
      answer:
          "This tool is designed for general personal use, curiosity, and planning. It gives you an accurate picture of your age down to the day, which is useful for milestone tracking, health planning, or simply satisfying your curiosity. However, for legal, medical, or official purposes - such as verifying age for contracts, insurance, medical records, or government documents - always refer to your official identification documents such as a passport, birth certificate, or national ID card. The calculator does not store any data you enter, and your date of birth is never sent to any server.",
    },
  ];

  return (
      <div className="space-y-5">
        <div>
          <div className="field-label">Date of Birth</div>
          <input
              type="date"
              className="field-input"
              value={dob}
              onChange={e => setDob(e.target.value)}
              max={today.toISOString().split("T")[0]}
          />
        </div>

        {valid && (
            <>
              <div className="result-box">
                <div className="result-label">Your Age</div>
                <div className="result-value text-3xl">
                  {years} <span className="text-base" style={{ color: "var(--text-secondary)" }}>years</span>
                </div>
                <div className="result-sub">{years} yr, {months} mo, {days} days</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Days", value: totalDays.toLocaleString(), sub: "days lived" },
                  { label: "Total Months", value: Math.floor(totalDays / 30.44).toLocaleString(), sub: "approx" },
                  { label: "Total Weeks", value: Math.floor(totalDays / 7).toLocaleString(), sub: "weeks" },
                  { label: "Next Birthday", value: nextBirthday, sub: `${birth.getDate()} ${birth.toLocaleString("en", { month: "long" })}` },
                ].map(item => (
                    <div key={item.label} className="result-box">
                      <div className="result-label">{item.label}</div>
                      <div className="result-value text-base">{item.value}</div>
                      <div className="result-sub">{item.sub}</div>
                    </div>
                ))}
              </div>
            </>
        )}

        <CalculatorInfo
            title="Age Calculator – Guide & FAQ"
            faqs={faqs}
        />
      </div>
  );
}