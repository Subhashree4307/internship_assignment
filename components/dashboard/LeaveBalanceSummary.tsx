"use client";

import React, { useEffect, useState } from "react";

type Balance = {
  leave_type: {
    name: string;
  };
  entitled_days: number;
  used_days: number;
  pending_days: number;
  available_days: number;
};

interface Props {
  userId: string;
}

const LeaveBalanceSummary: React.FC<Props> = ({ userId }) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await fetch(`/api/leave-balances?userId=${userId}`);
      const data = await res.json();
      if (res.ok) {
        setBalances(data);
      }
      setLoading(false);
    };

    if (userId) {
      load();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading balances…</div>;
  }

  if (!balances.length) {
    return <div>No leave balance data available.</div>;
  }

  const totals = balances.reduce(
    (acc, b) => {
      acc.entitled += b.entitled_days ?? 0;
      acc.used += b.used_days ?? 0;
      acc.pending += b.pending_days ?? 0;
      acc.available += b.available_days ?? 0;
      return acc;
    },
    { entitled: 0, used: 0, pending: 0, available: 0 }
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-slate-50 p-4">
        <h3 className="text-base font-semibold">Overall leave summary</h3>
        <div className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide">Total Entitled</span>
            <span className="text-base font-medium text-foreground">
              {totals.entitled}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide">Used</span>
            <span className="text-base font-medium text-foreground">
              {totals.used}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide">Pending</span>
            <span className="text-base font-medium text-foreground">
              {totals.pending}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide">Remaining</span>
            <span className="text-base font-medium text-foreground">
              {totals.available}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {balances.map((balance) => (
          <div key={balance.leave_type.name} className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">{balance.leave_type.name}</h3>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Entitled</span>
                <span>{balance.entitled_days}</span>
              </div>
              <div className="flex justify-between">
                <span>Used</span>
                <span>{balance.used_days}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span>{balance.pending_days}</span>
              </div>
              <div className="flex justify-between">
                <span>Available</span>
                <span>{balance.available_days}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalanceSummary;
