import { useEffect, useState } from 'react';
import { LoremIpsum } from 'lorem-ipsum';

// import ModalSvcContext from 'src/shared/services/modal/modal.context';
// import ModalService from 'src/shared/services/modal/modal.service';

// import APP_MODALS from 'src/static/enums/modals.enum';
import { toast } from 'react-toastify';

type Command = {
	name: string;
	description: string;
	execute: () => void;
};

const lorem = new LoremIpsum({
	wordsPerSentence: {
		max: 20,
		min: 10,
	},
});

export default function DevMenu() {
	// const modalSvc = useContext<ModalService>(ModalSvcContext);

	const commands: Command[] = [
		{
			name: 'reset',
			description: 'Resets the app storage',
			execute: function () {
				localStorage.clear();
			},
		},

		{
			name: 'lorem - words',
			description: 'generate random words',
			execute: async function () {
				const r = Math.round(Math.random() * 3) + 1;
				await navigator.clipboard.writeText(lorem.generateWords(r));
				toast.info('Copied to clipboard');
			},
		},
		{
			name: 'lorem - sentence',
			description: 'generate random sentence',
			execute: async function () {
				await navigator.clipboard.writeText(lorem.generateSentences(1));
				toast.info('Copied to clipboard');
			},
		},
		{
			name: 'lorem - parragraph',
			description: 'generate random parragraph',
			execute: async function () {
				await navigator.clipboard.writeText(lorem.generateParagraphs(1));
				toast.info('Copied to clipboard');
			},
		},

		{
			name: '?????',
			description: '??????????????????????',
			execute: function () {
				// add mario walking
				const imgUrl =
					'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/eb3b5a4f-6de2-4e44-8b57-ea55bc65fc86/dckxbxg-db6c8283-8e87-497b-92bc-f1f2be4a57cf.gif';
				// mario song
				const songUrl =
					'https://dl.vgmdownloads.com/soundtracks/super-mario-bros/jiqfbhrhqx/01.%20Ground%20Theme.mp3';
				const container = document.createElement('div');
				container.style.position = 'fixed';
				container.style.top = '0';
				container.style.left = '0';
				container.style.width = '100%';
				container.style.height = '100%';
				container.style.zIndex = '1000';
				container.style.pointerEvents = 'none';
				const audio = document.createElement('audio');
				audio.autoplay = true;
				audio.controls = false;
				audio.src = songUrl;
				container.appendChild(audio);
				const mario = document.createElement('div');
				container.appendChild(mario);
				mario.style.width = '150px';
				mario.style.height = '150px';
				mario.style.backgroundImage = `url(${imgUrl})`;
				mario.style.backgroundRepeat = 'no-repeat';
				mario.style.position = 'absolute';
				mario.style.top = '0';
				mario.style.left = '0';
				mario.style.transform = 'scale(-1)';
				// no repeat
				mario.style.animation = 'mario-walk 20s linear  ';
				const animation = `
					@keyframes mario-walk {
						from { left: 100%;}
						to { left: -5%;}
					}
				`;
				// add animation
				const style = document.createElement('style');
				style.innerHTML = animation;
				document.head.appendChild(style);
				document.body.appendChild(container);
				// remove mario walking on animaton end
				mario.addEventListener('animationend', () => {
					document.body.removeChild(container);
					document.head.removeChild(style);
				});
			},
		},
		{
			name: 'hide dev menu',
			description: 'Hides the dev menu',
			execute: function () {
				setVisible(false);
			},
		},
	];

	function toggleDevMenu() {
		setVisible(!visible);
	}

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		window.dev = toggleDevMenu;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.ctrlKey && e.shiftKey && e.key === 'K') {
				toggleDevMenu();
			}
		}

		// ctrl + alt + d
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	if (!visible) return null;

	return (
		<div className="p-4 rounded-md shadow-md w-[200px] fixed top-header left-[10px]  z-[500] bg-light-800 dark:bg-dark-800">
			<h1>Dev Menu</h1>

			<hr />

			<br />

			<ul>
				{commands.map((command, idx) => (
					<li key={idx}>
						<button
							type="button"
							onClick={command.execute}
							title={command.description}
							// hover underline
							className="hover:underline underline-offset-2"
						>
							{command.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
