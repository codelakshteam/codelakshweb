import { stack } from '@/lib/home';

// The technology index: a plain, precise table of what CodeLaksh builds with.
export default function TechIndex() {
  return (
    <div className="fm-index">
      <p className="fm-label">Technology index</p>
      <table>
        <caption className="fm-sr">Technologies CodeLaksh builds with, by discipline</caption>
        <tbody>
          {stack.map((g, i) => (
            <tr key={g.group}>
              <th scope="row"><small>{String(i + 1).padStart(2, '0')}</small>{g.group}</th>
              <td>{g.items.join('  /  ')}</td>
              <td className="fm-hide-s">{g.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
