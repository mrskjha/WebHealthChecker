"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal } from "lucide-react";

import { SiteCreate, SiteCreateSchema } from "@/types/site";
import { addSite } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FormValues = z.infer<typeof SiteCreateSchema>;

export default function AddSitePage() {
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const form = useForm<SiteCreate>({
    resolver: zodResolver(SiteCreateSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = async (data: SiteCreate) => {
    setSuccess(false);
    setErrorMsg("");

    try {
      const newSite: SiteCreate = {
        name: data.name,
        url: data.url,
      };

      await addSite(newSite);
      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error adding site:", error);
      setErrorMsg("Failed to add site. Please try again.");
    }
  };

  return (
    <section className="w-full bg-[#020617] py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Monitoring Your Website
          </h2>
          <p className="text-gray-400 max-w-md">
            Add your website to begin uptime monitoring, performance tracking,
            and instant alerts when something goes wrong.
          </p>
        </div>

        {/* Form card */}
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-xl" />

          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Success Alert */}
                {success && (
                  <Alert className="mb-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your website has been added successfully.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error Alert */}
                {errorMsg && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMsg}</AlertDescription>
                  </Alert>
                )}

                {/* Site Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Site Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="My Website"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Site URL */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Site URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting
                    ? "Adding Site..."
                    : "Add Site"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
