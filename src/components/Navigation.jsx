function Navigation({ currentStep, isDataSubmitted, onGoBack, onGoNext }) {
  const firstStep = 1
  const lastStep = 4

  return (
    <div className="steps-navigation" hidden={isDataSubmitted ? true : false}>
      <button className="back button" type="button" hidden={currentStep === firstStep && true} onClick={() => onGoBack()}>Go Back</button>
      <button className="next button" type="button" hidden={currentStep === lastStep && true} onClick={() => onGoNext()}>Next Step</button>
      <button className="confirm button" type="submit" hidden={currentStep !== lastStep && true}>Confirm</button>
    </div>
  )
}

export default Navigation