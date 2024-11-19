"use client";
import dayjs from "dayjs";
import { generateCalender } from "../utils/generateCalender";
import { daysOfWeek } from "../utils/daysOfWeek";
import { useState } from "react";
import { monthsOfYear } from "../utils/monthsOfYear";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Page() {
	const currentDay = dayjs();
	const [dates, setDates] = useState(generateCalender());
	const [selectedDate, setSelectedDate] = useState(currentDay);
	const [today, setToday] = useState(currentDay);

	function handleCurr() {
		setToday(currentDay);
	}

	function handlePrev() {
		setToday(today.month(today.month() - 1));
		setDates(generateCalender(today.month(), today.year()));
	}

	function handleNext() {
		setToday(today.month(today.month() + 1));
		setDates(generateCalender(today.month(), today.year()));
	}

	return (
		<div className="p-4 flex flex-col justify-center items-center">
			<h1 className="text-6xl text-center my-16">CALENDER</h1>

			<div className="grid md:grid-cols-2 gap-10 justify-center">
				<div className=" ">
					<div className="px-2 pb-4 flex justify-between min-w-[270px] max-w-[500px] mx-auto ">
						<h4>
							{monthsOfYear[today.month()]}, {today.year()}
						</h4>
						<div className="flex items-center gap-x-5">
							<GrFormPrevious
								size={20}
								className="cursor-pointer rounded-full hover:bg-slate-900/50 dark:hover:bg-slate-300/50"
								onClick={handlePrev}
							/>
							<h4
								onClick={handleCurr}
								className="cursor-pointer"
								title={currentDay.toString()}>
								Today
							</h4>
							<GrFormNext
								size={20}
								className="cursor-pointer rounded-full hover:bg-slate-900/50 dark:hover:bg-slate-300/50"
								onClick={handleNext}
							/>
						</div>
					</div>
					<div className="grid grid-cols-7 gap-y-2  min-w-[270px] max-w-[500px] mx-auto ">
						{daysOfWeek.map((day, i) => (
							<h3 key={i} className={`text-center `}>
								{day.slice(0, 1)}
							</h3>
						))}
						{generateCalender(today.month(), today.year()).map(
							(dateData, i) => (
								<div className="border-t pt-2" key={i}>
									<p
										onClick={() => setSelectedDate(dateData.date)}
										className={`
										${!dateData.currentMonth && "  text-gray-700/60 dark:text-gray-300/60 "} 
										${
											selectedDate === dateData.date && dateData.today
												? "bg-blue-600  "
												: selectedDate === dateData.date &&
												  " bg-slate-900/50 dark:bg-slate-300/50"
										}
									${dateData.today && "bg-blue-600  "} 
									font-bold hover:bg-slate-900/50 dark:hover:bg-slate-300/50 rounded-full text-center w-10  py-2 transition-colors ease-in-out duration-300 cursor-pointer`}>
										{dateData.date.date()}
									</p>
								</div>
							)
						)}
					</div>
				</div>
				<div className="border-l p-4 ">
					<h2>Schedule for {selectedDate.toDate().toDateString()}</h2>
					<p>no messages for today</p>
				</div>
			</div>
		</div>
	);
}
