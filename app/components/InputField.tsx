function InputComponent({
	inputType,
	htmlLabelFor,
	htmlLabel,
	inputValue,
	setValue,
}: any) {
	return (
		<div
			className={
				inputType === "checkbox"
					? "flex justify-end flex-row-reverse gap-4 text-left"
					: "flex flex-col"
			}>
			<label
				htmlFor={htmlLabelFor}
				className={
					inputType === "file"
						? "border uppercase text-sm py-2 rounded-lg p-3 focus:outline-[#5651e5] border-gray-300"
						: "uppercase text-sm py-2"
				}>
				{htmlLabel}
			</label>
			<input
				id={htmlLabelFor}
				type={inputType}
				name={htmlLabelFor}
				value={inputValue}
				onChange={setValue}
				checked={inputType === "checkbox" ? inputValue : false}
				className={
					inputType === "file"
						? "hidden"
						: "border-2 border-gray-300 focus:outline-[#5651e5] rounded-lg p-3 flex"
				}
			/>
		</div>
	);
}
export default InputComponent;
