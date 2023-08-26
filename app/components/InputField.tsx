function InputComponent({ inputType, htmlLabelFor, htmlLabel, setValue }: any) {
	return (
		<div
			className={
				inputType === "checkbox" ? "flex flex-row-reverse" : "flex flex-col"
			}>
			<label htmlFor={htmlLabelFor} className="uppercase text-sm py-2">
				{htmlLabel}
			</label>
			<input
				id={htmlLabelFor}
				type={inputType}
				name={htmlLabelFor}
				// value={inputValue}
				onChange={setValue}
				className="border-2 border-gray-300 focus:outline-[#5651e5] rounded-lg p-3 flex"
			/>
		</div>
	);
}
export default InputComponent;
