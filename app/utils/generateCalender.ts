import dayjs from "dayjs";

export const generateCalender = (
	month = dayjs().month(),
	year = dayjs().year()
) => {
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
	const monthDates = [];

	// GENERATE PREFIX DATE
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
		console.log(firstDateOfMonth.day(), firstDateOfMonth.day(i));
		monthDates.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
	}

	// GENERATE CURRENT DATE
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		monthDates.push({
			currentMonth: true,
			date: firstDateOfMonth.date(i),
			today:
				firstDateOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
		});
	}

	const remainingDates = 42 - monthDates.length;
	console.log(remainingDates);
	// GENERATE SUFFIX DATE
	for (
		let i = lastDateOfMonth.date() + 1;
		i <= lastDateOfMonth.date() + remainingDates;
		i++
	) {
		monthDates.push({ currentMonth: false, date: lastDateOfMonth.day(i) });
	}

	return monthDates;
};
