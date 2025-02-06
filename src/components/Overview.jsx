function Overview({ currentStep }) {

  return (
    <ol className="steps-overview">
      <li className={`step${currentStep === 1 ? " current" : ""}`}>
        <div className="label">Your info</div>
      </li>
      <li className={`step${currentStep === 2 ? " current" : ""}`}>
        <div className="label">Select plan</div>
      </li>
      <li className={`step${currentStep === 3 ? " current" : ""}`}>
        <div className="label">Add-ons</div>
      </li>
      <li className={`step${currentStep === 4 ? " current" : ""}`}>
        <div className="label">Summary</div>
      </li>
    </ol>
)
}

export default Overview