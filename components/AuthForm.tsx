"use client";

"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useIsClient } from "@/hooks/use-is-client";
import Spinner from "./spinner";
import { LoginSchema } from "@/schemas";
import CardWrapper from "./auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { PasswordInput } from "./password-input";
import { Button } from "./ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { login } from "@/actions/login";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const isClient = useIsClient();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      try {
        login(values, callbackUrl).then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        });
      } catch (err) {
        setError(`Something went wrong! Error:${err}`);
      } finally {
        setShowTwoFactor(false);
        setSuccess("");
        setError("");
      }
    });
  };

  if (!isClient) return <Spinner />;

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Authentication Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="email"
                          placeholder="your.email@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          disabled={isPending}
                          type="password"
                          placeholder="******"
                        />
                      </FormControl>
                      <FormMessage />
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 text-muted-foreground"
                      >
                        <Link href="/auth/reset">Forgot your password?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          {error && <FormError message={error || urlError} />}
          {success && <FormSuccess message={success} />}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full hover:bg-sky-400"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;

/*import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { lusitana } from "@/lib/font";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actions";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import { formSchemaForSign } from "@/lib/utils";
import { signIn } from "@/auth";

export const formSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export interface authFormProps {
  seeOrNot: boolean;
  presenceNomEtprenom: boolean;
}

export default function AuthForm({
  seeOrNot,
  presenceNomEtprenom,
}: authFormProps) {
  const myFormSchema = formSchemaForSign(presenceNomEtprenom);
  const form = useForm<z.infer<typeof myFormSchema>>({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof myFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <Form {...form}>
      <div className="relative flex flex-col items-center gap-5 border-2 border-[#006ce4] p-8 w-[360px] md:w-[450px] rounded-lg bg-white">
        <div className="absolute -top-12 flex items-center justify-center w-full">
          <div className="flex flex-col text-[#003b95] text-2xl font-bold brightness-100 cursor-pointer bg-transparent text-center bg-white rounded-lg shadow-lg p-3">
            <p>Mamaison</p>
            <p className="-mt-2">ALouer.com</p>
          </div>
        </div>
        <form
           onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
          action={dispatch}
        >
          <p className="text-lg font-semibold text-center w-full text-black mt-2">
            Entrez voz coordonnez ici :
          </p>
          {presenceNomEtprenom && (
            <div className="flex flex-col gap-4">
              {" "}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-center w-full text-black">
                      Entrer votre nom
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-center w-full text-black">
                      Entrer votre prenom
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre prenom"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-center w-full text-black">
                  Entrer votre email
                </FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-center w-full text-black">
                  Entrer votre mots de passe{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="mots de passe"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              className="bg-[#006ce4] hover:bg-[#006ce4]/90 w-full"
            >
              Soumettre
            </Button>
            {seeOrNot && (
              <div className="flex justify-center">
                <span className="mr-2">
                  Vous n&apos;&ecirc;tes pas encore inscrit
                </span>{" "}
                <Link href="#" className="text-[#006ce4]">
                  Cliquez ici
                </Link>
              </div>
            )}
          </div>
        </form>

        <div className="flex flex-col items-center w-full gap-3">
          <p className="text-lg ">Ou choisissez cet options</p>
          <div className="flex items-center justify-center w-[90%]">
            <Button className=" bg-[#1a1a1a] w-full p-5 text-white">
              {" "}
              <Image
                src="/R.png"
                width={20}
                height={20}
                alt="Google"
                className="rounded-full mr-2"
              />{" "}
              Se connecter avec Google
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}*/
