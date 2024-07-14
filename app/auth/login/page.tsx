import LoginForm from "@/components/AuthForm";
import { Suspense } from "react";
/*import AuthForm from "@/components/AuthForm";*/

export default function SigninForm() {
  return (
    <Suspense>
      <LoginForm /*seeOrNot={true} presenceNomEtprenom={false}*/ />
    </Suspense>
  );
}
