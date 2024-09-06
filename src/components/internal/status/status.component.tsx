import { ProposalStatus } from 'src/static/enums/proposal-state.enum';

type Props = {
	status: ProposalStatus;
};

export default function StatusTag({ status }: Props) {
	return (
		<div
			className={`flex items-center   rounded-md py-1 px-2 w-fit ${
				status === ProposalStatus.ACCEPTED
					? 'bg-[#E2FFF0] text-[#009545] dark:bg-[#27282D]'
					: status === ProposalStatus.REJECTED
					? 'bg-[#FFEBEF] text-[#FC4137] dark:bg-[#27282D]'
					: status === ProposalStatus.EXPIRED
					? 'bg-[#F2F3F7] text-[#5F5F74] dark:bg-[#27282D] dark:text-[#8E99B0]'
					: ''
			}`}
		>
			<span className="capitalize text-sm font-medium">{status}</span>
		</div>
	);
}
