import { palindrome } from "../for_testing";

test("palindrome of alex", () => {
  const result = palindrome("alex");

  expect(result).toBe("xela");
});
