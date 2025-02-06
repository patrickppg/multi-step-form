import { useCallback, useRef, useState } from 'react'
import { addons, plans } from './utils'
import Navigation from "./components/Navigation"
import Overview from "./components/Overview"
import Steps from "./components/Steps"

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const formRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()

    setIsDataSubmitted(true)
  }

  function handleGoBack() {
    setCurrentStep(currentStep - 1)
  }

  function handleGoNext() {
    let currentControls = []
    let isCurrentControlsValid = true
    
    if (currentStep === 1) currentControls = [...formRef.current.elements["step-01"].elements]

    for (let control of currentControls) {
      let isValid

      if (control.willValidate) isValid = control.checkValidity()
      else isValid = true
      isCurrentControlsValid &&= isValid
    }

    if (isCurrentControlsValid) setCurrentStep(currentStep + 1)
  }

  function handleSummaryChange() {
    setCurrentStep(2)
  }

  const getSummary =  useCallback(() => {
    const form = formRef.current

    const selectedBilling = form.elements["billing"].value
    const billingSummary = selectedBilling === "monthly" ? "Month" : "Year"

    const selectedPlan = form.elements["plan"].value
    const planData = plans.find(plan => plan.code === selectedPlan)
    const planSummary = { 
      name: planData.name,
      price: selectedBilling === "monthly" ? planData.price.month : planData.price.year,
    }

    let selectedAddons = []
    for (const addon of form.elements["addon"]) {
      if (addon.checked) selectedAddons.push(addon.value)
    }
    let addonsSummary = []
    selectedAddons.forEach(addon => {
      const addonData = addons.find(a => a.code === addon)
      addonsSummary.push({
        name: addonData.name,
        price: selectedBilling === "monthly" ? addonData.price.month : addonData.price.year
      })
    })

    return { billing: billingSummary, plan: planSummary, addons: addonsSummary }
  }, [])

  return (
    <div>
      <form id='form-plan' ref={formRef} onSubmit={handleSubmit}>
        <Overview currentStep={currentStep} />
        <Steps
          currentStep={currentStep}
          isDataSubmitted={isDataSubmitted}
          getSummary={getSummary}
          onSummaryChange={handleSummaryChange}
        />
        <Navigation
          currentStep={currentStep}
          isDataSubmitted={isDataSubmitted}
          onGoBack={handleGoBack}
          onGoNext={handleGoNext}
        />
      </form>
    </div>
  )
}

export default App
