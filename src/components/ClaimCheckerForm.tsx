import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Step =
  | "deposit_paid"
  | "no_claim"
  | "scheme"
  | "letter"
  | "tenancy_agreement"
  | "claim_result"
  | "contact_details"
  | "summary";

type ClaimStrength = "strong" | "possible";

const ClaimCheckerForm = () => {
  const [step, setStep] = useState<Step>("deposit_paid");
  const [claimStrength, setClaimStrength] = useState<ClaimStrength>("strong");

  // Answers
  const [depositPaid, setDepositPaid] = useState("");
  const [scheme, setScheme] = useState("");
  const [letter, setLetter] = useState("");
  const [tenancyAgreement, setTenancyAgreement] = useState("");

  // Deposit details
  const [depositSize, setDepositSize] = useState("");
  const [postcode, setPostcode] = useState("");
  const [depositDate, setDepositDate] = useState("");
  const [tenancyStartDate, setTenancyStartDate] = useState("");

  // Contact details
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [currentStepNum, setCurrentStepNum] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const goToStep = (s: Step, num: number) => {
    setStep(s);
    setCurrentStepNum(num);
  };

  const handleDepositPaid = () => {
    if (depositPaid === "no") {
      goToStep("no_claim", 1);
    } else if (depositPaid === "yes") {
      goToStep("scheme", 2);
    }
  };

  const handleScheme = () => {
    if (!scheme) return;
    if (scheme === "yes") {
      goToStep("no_claim", 2);
    } else {
      goToStep("letter", 3);
    }
  };

  const handleLetter = () => {
    if (!letter) return;
    goToStep("tenancy_agreement", 4);
  };

  const handleTenancyAgreement = () => {
    if (!tenancyAgreement) return;

    // Determine claim strength based on answers
    const noScheme = scheme === "no" || scheme === "not_sure";
    const noLetter = letter === "no" || letter === "not_sure";
    const lateScheme = scheme === "late";
    const lateLetter = letter === "late";

    if (noScheme || noLetter) {
      setClaimStrength("strong");
    } else if (lateScheme || lateLetter) {
      setClaimStrength("strong");
    } else {
      setClaimStrength("possible");
    }

    goToStep("claim_result", 5);
  };

  const handleClaimResult = () => {
    if (!depositSize || !postcode || !depositDate || !tenancyStartDate) return;
    goToStep("contact_details", 6);
  };

  const handleContactDetails = () => {
    if (!firstName || !surname || !phone || !email) return;
    goToStep("summary", 7);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep("deposit_paid");
    setCurrentStepNum(1);
    setDepositPaid("");
    setScheme("");
    setLetter("");
    setTenancyAgreement("");
    setDepositSize("");
    setPostcode("");
    setDepositDate("");
    setTenancyStartDate("");
    setFirstName("");
    setSurname("");
    setPhone("");
    setEmail("");
    setSubmitted(false);
  };

  const stepIndicator = (
    <div className="text-sm font-medium text-muted-foreground mb-4">
      Step {currentStepNum}
    </div>
  );

  if (submitted) {
    return (
      <div className="w-full max-w-xl mx-auto p-8">
        <div className="bg-card rounded-lg shadow-md p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Thank you!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your claim checker has been submitted. We will run checks on your
            deposit and respond to you via email, phone or WhatsApp with the
            status of your claim and the potential value.
          </p>
          <Button onClick={resetForm} variant="outline">
            Submit another claim
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8">
      <div className="bg-card rounded-lg shadow-md p-8">
        {/* Step 1: Deposit paid? */}
        {step === "deposit_paid" && (
          <div>
            {stepIndicator}
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Have you paid a tenancy deposit within the last 6 years?
            </h3>
            <RadioGroup value={depositPaid} onValueChange={setDepositPaid} className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="dp-yes" />
                <Label htmlFor="dp-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="dp-no" />
                <Label htmlFor="dp-no">No</Label>
              </div>
            </RadioGroup>
            <Button onClick={handleDepositPaid} disabled={!depositPaid} className="w-full">
              Next
            </Button>
          </div>
        )}

        {/* No Claim */}
        {step === "no_claim" && (
          <div className="text-center">
            <div className="text-4xl mb-4">😖</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Sorry, you don't have a claim
            </h3>
            <p className="text-muted-foreground mb-6">Would you like to check again?</p>
            <Button onClick={resetForm}>Yes</Button>
          </div>
        )}

        {/* Step 2: Scheme */}
        {step === "scheme" && (
          <div>
            {stepIndicator}
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Was your deposit placed into a government scheme?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Either the TDS, the DPS or My Deposits
            </p>
            <RadioGroup value={scheme} onValueChange={setScheme} className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="s-yes" />
                <Label htmlFor="s-yes">Yes, I'm certain it was</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="late" id="s-late" />
                <Label htmlFor="s-late">Yes, but more than 30 days after I paid it</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="s-no" />
                <Label htmlFor="s-no">No, I'm certain it wasn't</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_sure" id="s-unsure" />
                <Label htmlFor="s-unsure">I'm not sure</Label>
              </div>
            </RadioGroup>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => goToStep("deposit_paid", 1)} className="flex-1">
                Previous
              </Button>
              <Button onClick={handleScheme} disabled={!scheme} className="flex-1">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Letter */}
        {step === "letter" && (
          <div>
            {stepIndicator}
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Have you ever been provided with a letter or email from the TDS,
              the DPS or My Deposits to tell you they have received your deposit?
            </h3>
            <RadioGroup value={letter} onValueChange={setLetter} className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="l-yes" />
                <Label htmlFor="l-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="late" id="l-late" />
                <Label htmlFor="l-late">Yes, but more than 30 days after I paid it</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="l-no" />
                <Label htmlFor="l-no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_sure" id="l-unsure" />
                <Label htmlFor="l-unsure">I'm not sure</Label>
              </div>
            </RadioGroup>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => goToStep("scheme", 2)} className="flex-1">
                Previous
              </Button>
              <Button onClick={handleLetter} disabled={!letter} className="flex-1">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Tenancy agreement */}
        {step === "tenancy_agreement" && (
          <div>
            {stepIndicator}
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Do you have a copy of your tenancy agreement?
            </h3>
            <RadioGroup value={tenancyAgreement} onValueChange={setTenancyAgreement} className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="ta-yes" />
                <Label htmlFor="ta-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="ta-no" />
                <Label htmlFor="ta-no">No</Label>
              </div>
            </RadioGroup>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => goToStep("letter", 3)} className="flex-1">
                Previous
              </Button>
              <Button onClick={handleTenancyAgreement} disabled={!tenancyAgreement} className="flex-1">
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Claim result + deposit details */}
        {step === "claim_result" && (
          <div>
            {stepIndicator}
            <div className="mb-6 p-4 rounded-md bg-primary/10 border border-primary/20">
              <p className="text-foreground font-medium">
                {claimStrength === "strong"
                  ? "👍 You have a claim, please enter your deposit details below and we will confirm the minimum and maximum value of your claim"
                  : "👍 You may have a claim, please enter your deposit details below and we will confirm"}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="deposit-size">Size of your deposit</Label>
                <Input
                  id="deposit-size"
                  type="text"
                  placeholder="£"
                  value={depositSize}
                  onChange={(e) => setDepositSize(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="postcode">Postcode of rented property</Label>
                <p className="text-xs text-muted-foreground mb-1">
                  Please note: we can't claim against deposits paid in Northern Ireland, Ireland or Scotland.
                </p>
                <Input
                  id="postcode"
                  type="text"
                  placeholder="e.g. SW1A 1AA"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="deposit-date">When did you pay the deposit?</Label>
                <p className="text-xs text-muted-foreground mb-1">
                  We can only claim against deposits paid in the past six years.
                </p>
                <Input
                  id="deposit-date"
                  type="date"
                  value={depositDate}
                  onChange={(e) => setDepositDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tenancy-start">What date did the Tenancy start?</Label>
                <Input
                  id="tenancy-start"
                  type="date"
                  value={tenancyStartDate}
                  onChange={(e) => setTenancyStartDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => goToStep("tenancy_agreement", 4)} className="flex-1">
                Previous
              </Button>
              <Button
                onClick={handleClaimResult}
                disabled={!depositSize || !postcode || !depositDate || !tenancyStartDate}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Contact details */}
        {step === "contact_details" && (
          <div>
            {stepIndicator}
            <h3 className="text-lg font-semibold text-foreground mb-4">
              👤 Please enter your contact details below
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="first-name">Your First Name</Label>
                <Input
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="surname">Your Surname</Label>
                <Input
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Your Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Your Email Address</Label>
                <p className="text-xs text-muted-foreground mb-1">
                  We send the results of our claim checker to your email, please check your junk folder.
                </p>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => goToStep("claim_result", 5)} className="flex-1">
                Previous
              </Button>
              <Button
                onClick={handleContactDetails}
                disabled={!firstName || !surname || !phone || !email}
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 7: Summary */}
        {step === "summary" && (
          <div>
            {stepIndicator}
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Your claim checker is now complete
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-6">
              <li>
                Tap the button below to submit your details to our team.
              </li>
              <li>
                We will then run checks on your deposit and respond to you via
                email, phone or WhatsApp with the status of your claim and the
                potential value.
              </li>
              <li>
                You are then free to not proceed if you wish, ask any questions
                about our process or continue with your claim.
              </li>
            </ol>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => goToStep("contact_details", 6)} className="flex-1">
                Previous
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Check My Claim
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimCheckerForm;
