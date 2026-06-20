import "./TerminalBackground.css";

const lines = [
  "/usr/bin/python",
  "/etc/nginx",
  "/var/log",
  "/home/justy",
  "Deploying ACS Build",
  "Migration Completed",
  "Restarting Worker",
  "Database Connected",
];

export default function TerminalBackground() {

  return (
    <div className="terminal-bg">

      {lines.map((line,index)=>(
        <div key={index}>
          root@server:~# {line}
        </div>
      ))}

    </div>
  );
}