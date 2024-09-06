import { Link } from 'react-router-dom';
import ROUTES from 'src/static/router.data';

export default function TxnNotification({ hash, text }: { hash: string; text: string }) {
	return (
		<div className="space-y-2">
			<h1 className="text-black dark:text-white">{text}</h1>
			<Link
				to={ROUTES.external.explorer.txn.replace(':hash', hash)}
				target="_blank"
				rel="noreferrer"
			>
				View on Explorer
			</Link>
		</div>
	);
}
