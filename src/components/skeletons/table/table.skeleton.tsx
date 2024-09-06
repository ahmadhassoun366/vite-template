function TableSkeleton() {
	const cols = [
		{
			id: 0,
			// w: '180px',
		},
		{
			id: 0,
			// w: '80px',
		},
		{
			id: 0,
			// w: '50px',
		},
		{
			id: 0,
			// w: '90px',
		},
		{
			id: 0,
			// w: '50px',
		},
	];

	return (
		<section>
			{/* Table */}
			<div className="w-full mt-5 overflow-x-auto scroll-sm">
				<table className="table-auto bg-awhite w-full ">
					{/* table header */}
					<thead className="">
						<tr className="border-b border-b-black dark:border-b-white border-opacity-20 dark:border-opacity-20">
							{cols.map((_, idx) => (
								<th key={idx} className="py-2 px-8 ">
									<div className=" skeleton-container">
										<div className="skeleton-title"></div>
									</div>
								</th>
							))}
						</tr>
					</thead>

					{/* table body - Skeleton Rows */}
					<tbody className="">
						{new Array(5).fill(0).map((_, idx) => (
							<tr
								key={idx}
								className={` ${
									idx % 2 == 0
										? ' dark:bg-dark-900 bg-light-900'
										: 'bg-transparent'
								}`}
							>
								{cols.map((_, idx2) => (
									<td
										className="xl:px-8 px-2 py-10  skeleton-container"
										key={idx2}
									>
										<div
											className="skeleton-line !mb-0"
											// style={{ width: _.w || 'auto' }}
										></div>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<div className="skeleton-pagination" />
			</div>
		</section>
	);
}

export default TableSkeleton;
