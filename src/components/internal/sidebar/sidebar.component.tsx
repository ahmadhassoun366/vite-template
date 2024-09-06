// import React from "react";
// import { FilterValue } from "src/components/context/sideBarContext";
// import { usePageHandler } from "src/components/context/sideBarContext";

// type LinkGroup = {
//     title: string;
//     links: { name: string; value: FilterValue }[];
// };

// type SidebarProps = {
//     linkGroups: LinkGroup[];
//     onLinkClick: (value: FilterValue) => void; // Add this line
// };

// const Sidebar: React.FC<SidebarProps> = ({ linkGroups, onLinkClick }) => { // Update the props
//     const pageHandler = usePageHandler();

//     if (!pageHandler) {
//         return null;
//     }

//     const { filter, setFilter } = pageHandler;

//     return (
//         <aside className="min-w-[200px] hidden lg:block sticky top-[9rem] bg-white text-gray-900">
//             {linkGroups.map((group, index) => (
//                 <div key={index} className="space-y-4">
//                     <h1 className="text-gray-500 text-base font-bold font-['Space Grotesk'] leading-relaxed">
//                         {group.title}
//                     </h1>
//                     <ul className="list-none">
//                         {group.links.map((link, idx) => (
//                             <li key={idx}>
//                                 <button
//                                     onClick={() => {
//                                         setFilter(link.value);
//                                         onLinkClick(link.value); // Call the callback when a link is clicked
//                                     }}
//                                     className={`w-full text-left p-2 px-4 border-l-[3px] ${filter === link.value ? "border-black" : "border-gray-100"} hover:bg-[#ECEBFF]`}
//                                 >
//                                     {link.name}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </aside>
//     );
// };

// export default Sidebar;
