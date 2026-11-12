# Cydeo Checkout Test Plan

## Application Overview

Plan for the Cydeo checkout application at https://qa.sep.tdtm.cydeo.com/taws. The configured /taws route and /login both display “Checkout | Cydeo,” not a login form; the user confirmed checkout is the intended scope. The observed first step collects required first name, last name, email, phone, and an optional “How did you hear about us?” value, followed by Payment plan and Review steps. Tests should stop before any actual payment submission.

## Test Scenarios

### 1. Checkout application and customer details

**Seed:** `tests/seed.spec.ts`

#### 1.1. Shows the checkout summary and customer details form

**File:** `tests/checkout/checkout-initial-state.spec.ts`

**Steps:**
  1. Navigate to https://qa.sep.tdtm.cydeo.com/taws
    - expect: The page title is “Checkout | Cydeo”.
    - expect: The progress indicator shows Start Application, Payment plan, and Review, with Start Application active.
    - expect: The Test Automation with Selenium program summary and current price are visible.
    - expect: First Name, Last Name, Email Address, and Phone fields and the Next button are visible.

#### 1.2. Requires the mandatory customer details before continuing

**File:** `tests/checkout/checkout-required-fields.spec.ts`

**Steps:**
  1. Open the checkout page and leave First Name, Last Name, Email Address, and Phone empty.
    - expect: The required inputs are visibly marked as required.
  2. Click Next.
    - expect: The checkout remains on Start Application.
    - expect: Validation feedback identifies the missing required customer details.

#### 1.3. Rejects an invalid email address

**File:** `tests/checkout/checkout-invalid-email.spec.ts`

**Steps:**
  1. Fill First Name, Last Name, and Phone with valid test values, and enter an invalid value in Email Address.
    - expect: The entered values are shown in their corresponding fields.
  2. Click Next.
    - expect: The checkout remains on Start Application.
    - expect: Email validation feedback is shown and the form does not advance.

#### 1.4. Continues to payment plan after valid customer details

**File:** `tests/checkout/checkout-continues-to-payment.spec.ts`

**Steps:**
  1. Fill First Name, Last Name, Email Address, and Phone with valid test values; leave the referral field unselected unless the page marks it required.
    - expect: The required customer fields contain the entered values.
  2. Click Next.
    - expect: The Payment plan step becomes active.
    - expect: The payment-plan choices are displayed.

#### 1.5. Carries the chosen payment plan into review

**File:** `tests/checkout/checkout-review-flow.spec.ts`

**Steps:**
  1. Enter valid customer details, continue to Payment plan, and select one available payment option.
    - expect: The selected payment option is visibly selected and its displayed pricing is consistent with the checkout summary.
  2. Continue to Review.
    - expect: The Review step becomes active.
    - expect: The review shows the order price, upfront discount, subtotal, processing fee, and total.
    - expect: Terms acceptance is visible and Pay remains disabled; do not submit payment.
