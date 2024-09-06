export default function ProposalBoxSkeleton() {
	return (
		<div className="skeleton-container ">
			<div className=" w-full h-[244px]  p-2   lg:h-[152px] ">
				<div className=" flex flex-col gap-[20px]">
					{/* proposal title*/}
					<div className="flex flex-col md:items-center justify-between md:flex-row">
						<div className=" skeleton-line w-[100px] "></div>
						{/* time */}
						<div className=" skeleton-box rounded-md h-[42px] w-full mt-[15px] md:w-[100px] md:h-8"></div>
					</div>

					{/* proposal paragraph*/}
					<div className="flex flex-col gap-[15px] w-full">
						<div className=" skeleton-line w-full "></div>
						<div className=" skeleton-line w-full "></div>
						<div className=" skeleton-line w-full "></div>
					</div>
				</div>

				{/* tag*/}
				<div className="flex flex-col md:items-center md:flex-row justify-between w-[200px]  mt-[30px] md:mt-[30px]">
					<div className=" skeleton-box rounded-md h-[20px] w-3/6 md:w-[100px] "></div>
					{/* the comment and save icon */}
					<div className="flex items-center gap-[20px] mt-[15px] md:mt-0">
						<div className=" skeleton-box rounded-md h-[20px] w-[30px] "></div>
						<div className=" skeleton-box rounded-md h-[20px] w-[30px] "></div>
					</div>
				</div>
			</div>
		</div>
	);
}
