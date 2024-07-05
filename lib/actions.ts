export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log({ email, password });
    // const userCredential= await createUserWithEmailAndPassword(auth, email,password)
    console.log(formData);
  } catch (error) {
    return "Invalid credentials.";
  }
}
