"use client";
import { useState } from "react";

export default function Page() {
  const [dob, setDob] = useState("1990-01-01");

  const today = new Date();
  const birth = new Date(dob);

  let years = 0, months = 0, days = 0, totalDays = 0, nextBirthday = "";

  if (dob && !isNaN(birth.getTime())) {
    years = today.getFullYear() - birth.getFullYear();
    months = today.getMonth() - birth.getMonth();
    days = today.getDate() - birth.getDate();

    if (days < 0) { months--; const prev = new Date(today.getFullYear(), today.getMonth(), 0); days += prev.getDate(); }
    if (months < 0) { years--; months += 12; }

    totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);

    const nextBD = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBD <= today) nextBD.setFullYear(today.getFullYear() + 1);
    const daysUntil = Math.ceil((nextBD.getTime() - today.getTime()) / 86400000);
    nextBirthday = daysUntil === 0 ? "Today! 🎉" : `${daysUntil} days`;
  }

  const valid = dob && !isNaN(birth.getTime()) && birth < today;

  return (
    <div className="space-y-5">
      <div>
        <div className="field-label">Date of Birth</div>
        <input type="date" className="field-input" value={dob} onChange={e=>setDob(e.target.value)} max={today.toISOString().split("T")[0]} />
      </div>

      {valid && (
        <>
          <div className="result-box">
            <div className="result-label">Your Age</div>
            <div className="result-value text-3xl">{years} <span className="text-base" style={{color:"var(--text-secondary)"}}>years</span></div>
            <div className="result-sub">{years} yr, {months} mo, {days} days</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {label:"Total Days",value:totalDays.toLocaleString(),sub:"days lived"},
              {label:"Total Months",value:Math.floor(totalDays/30.44).toLocaleString(),sub:"approx"},
              {label:"Total Weeks",value:Math.floor(totalDays/7).toLocaleString(),sub:"weeks"},
              {label:"Next Birthday",value:nextBirthday,sub:`${birth.getDate()} ${birth.toLocaleString("en",{month:"long"})}`},
            ].map(item=>(
              <div key={item.label} className="result-box">
                <div className="result-label">{item.label}</div>
                <div className="result-value text-base">{item.value}</div>
                <div className="result-sub">{item.sub}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
