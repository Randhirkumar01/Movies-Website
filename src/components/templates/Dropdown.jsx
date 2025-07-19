export default function Dropdown({ title, options, func }) {
  return (
    <div className="select">
      <select name={title} id={title} defaultValue="0" onChange={func}>
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
