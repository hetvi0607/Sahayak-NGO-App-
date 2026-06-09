import { useEffect, useState } from 'react';
import { miscService } from '../services/miscService.js';

export default function NotificationPanel() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    miscService.notifications().then(setItems).catch(() => setItems([]));
  }, []);
  return (
    <section className="card" aria-labelledby="notifications-heading">
      <h2 id="notifications-heading" className="text-lg font-bold">Notifications</h2>
      <div className="mt-3 space-y-2">
        {items.length === 0 && <p className="text-sm text-slate-500">No notifications yet.</p>}
        {items.slice(0, 5).map((item) => (
          <p key={item._id} className={`rounded-md p-3 text-sm ${item.read ? 'bg-slate-50' : 'bg-blue-50'}`}>{item.message}</p>
        ))}
      </div>
    </section>
  );
}
