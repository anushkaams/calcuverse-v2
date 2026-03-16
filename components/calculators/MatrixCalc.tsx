"use client";
import { useState } from "react";

type Matrix = [[number,number],[number,number]];
type Op = "det" | "inv" | "mul" | "add";

function det(m: Matrix) { return m[0][0]*m[1][1] - m[0][1]*m[1][0]; }
function inv(m: Matrix): Matrix | null {
  const d = det(m);
  if (d === 0) return null;
  return [[m[1][1]/d, -m[0][1]/d], [-m[1][0]/d, m[0][0]/d]];
}
function mul(a: Matrix, b: Matrix): Matrix {
  return [
    [a[0][0]*b[0][0]+a[0][1]*b[1][0], a[0][0]*b[0][1]+a[0][1]*b[1][1]],
    [a[1][0]*b[0][0]+a[1][1]*b[1][0], a[1][0]*b[0][1]+a[1][1]*b[1][1]],
  ];
}
function add(a: Matrix, b: Matrix): Matrix {
  return [[a[0][0]+b[0][0], a[0][1]+b[0][1]], [a[1][0]+b[1][0], a[1][1]+b[1][1]]];
}

function MatrixInput({ label, values, onChange }: { label: string; values: string[][]; onChange: (r: number, c: number, v: string) => void }) {
  return (
    <div>
      <div className="field-label mb-2">{label}</div>
      <div className="grid grid-cols-2 gap-1.5">
        {[0,1].map(r => [0,1].map(c => (
          <input key={`${r}${c}`} type="number" className="field-input text-center"
            value={values[r][c]} onChange={e => onChange(r, c, e.target.value)} />
        )))}
      </div>
    </div>
  );
}

function fmt(n: number) { return parseFloat(n.toFixed(6)).toString(); }

export default function MatrixCalc() {
  const [a, setA] = useState([["1","2"],["3","4"]]);
  const [b, setB] = useState([["5","6"],["7","8"]]);
  const [op, setOp] = useState<Op>("det");

  const toM = (s: string[][]): Matrix => s.map(r => r.map(v => parseFloat(v)||0)) as Matrix;
  const mA = toM(a), mB = toM(b);

  const updateA = (r: number, c: number, v: string) => setA(prev => { const n = prev.map(row => [...row]); n[r][c] = v; return n; });
  const updateB = (r: number, c: number, v: string) => setB(prev => { const n = prev.map(row => [...row]); n[r][c] = v; return n; });

  let resultEl: React.ReactNode = null;
  if (op === "det") {
    const d = det(mA);
    resultEl = <div className="result-box"><div className="result-label">det(A)</div><div className="result-value text-3xl">{fmt(d)}</div><div className="result-sub">{d === 0 ? "Matrix is singular (not invertible)" : "Matrix is invertible"}</div></div>;
  } else if (op === "inv") {
    const inv_m = inv(mA);
    if (!inv_m) resultEl = <div className="result-box"><div className="result-label">A⁻¹</div><div className="result-value text-red-400">Singular matrix</div><div className="result-sub">det = 0, no inverse</div></div>;
    else resultEl = <div className="result-box"><div className="result-label">A⁻¹</div><div className="grid grid-cols-2 gap-1 mt-2">{inv_m.flat().map((v,i)=><div key={i} className="font-mono text-center p-2 rounded-lg text-sm" style={{background:"var(--surface-3)", color:"var(--text-primary)"}}>{fmt(v)}</div>)}</div></div>;
  } else if (op === "mul") {
    const r = mul(mA, mB);
    resultEl = <div className="result-box"><div className="result-label">A × B</div><div className="grid grid-cols-2 gap-1 mt-2">{r.flat().map((v,i)=><div key={i} className="font-mono text-center p-2 rounded-lg text-sm" style={{background:"var(--surface-3)", color:"var(--text-primary)"}}>{fmt(v)}</div>)}</div></div>;
  } else if (op === "add") {
    const r = add(mA, mB);
    resultEl = <div className="result-box"><div className="result-label">A + B</div><div className="grid grid-cols-2 gap-1 mt-2">{r.flat().map((v,i)=><div key={i} className="font-mono text-center p-2 rounded-lg text-sm" style={{background:"var(--surface-3)", color:"var(--text-primary)"}}>{fmt(v)}</div>)}</div></div>;
  }

  const ops: {id: Op; label: string}[] = [{id:"det",label:"det(A)"},{id:"inv",label:"A⁻¹"},{id:"mul",label:"A×B"},{id:"add",label:"A+B"}];

  return (
    <div className="space-y-5">
      <div className="tab-group">
        {ops.map(o => <button key={o.id} className={`tab-item ${op===o.id?"active":""}`} onClick={()=>setOp(o.id)}>{o.label}</button>)}
      </div>

      <div className={`grid gap-4 ${op==="det"||op==="inv" ? "grid-cols-1" : "grid-cols-2"}`}>
        <MatrixInput label="Matrix A" values={a} onChange={updateA} />
        {(op==="mul"||op==="add") && <MatrixInput label="Matrix B" values={b} onChange={updateB} />}
      </div>

      {resultEl}
    </div>
  );
}
