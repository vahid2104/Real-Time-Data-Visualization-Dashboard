import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type Severity = "info" | "warning" | "critical";

export interface DbAlert {
  _id: string;
  title: string;
  description: string;
  severity: Severity;
  source?: string;
  acknowledged: boolean;
  createdAt: string;
  updatedAt: string;
}

const SOCKET_URL = "http://localhost:4000";

export function useAlertsSocket() {
  const [alerts, setAlerts] = useState<DbAlert[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("alerts:seed");
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("alerts:init", (data: DbAlert[]) => {
      setAlerts(data);
    });

    socket.on("alerts:new", (alert: DbAlert) => {
      setAlerts((prev) => [alert, ...prev]);
    });

    socket.on("alerts:update", (updated: DbAlert) => {
      setAlerts((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    alerts,
    connected,
  };
}
