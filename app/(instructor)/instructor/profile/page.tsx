"use client";

import axios from "axios";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import InstructorAccountInfo from "@/components/instructor/profile/InstructorAccountInfo";
import InstructorProfileForm from "@/components/instructor/profile/InstructorProfileForm";
import InstructorProfileHeader from "@/components/instructor/profile/InstructorProfileHeader";
import InstructorProfileOverview from "@/components/instructor/profile/InstructorProfileOverview";

import {
  getInstructorProfile,
  updateInstructorProfile,
} from "@/services/instructorProfileService";

import type {
  InstructorProfileResponse,
  UpdateInstructorProfileRequest,
} from "@/types/instructorProfile";

export default function InstructorProfilePage() {
  const router =
    useRouter();

  const [
    profile,
    setProfile,
  ] =
    useState<InstructorProfileResponse | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  const handleAuthFailure =
    useCallback(() => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "role"
      );

      localStorage.removeItem(
        "email"
      );

      router.replace("/login");
    }, [router]);

  const loadProfile =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getInstructorProfile();

        setProfile(data);
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          (
            err.response?.status === 401 ||
            err.response?.status === 403
          )
        ) {
          handleAuthFailure();
          return;
        }

        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message ||
                "Unable to load your instructor profile."
            : "Unable to load your instructor profile."
        );
      } finally {
        setLoading(false);
      }
    }, [handleAuthFailure]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  async function handleSave(
    request: UpdateInstructorProfileRequest
  ) {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const updated =
        await updateInstructorProfile(
          request
        );

      setProfile(updated);

      setMessage(
        "Your instructor profile has been updated."
      );
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        (
          err.response?.status === 401 ||
          err.response?.status === 403
        )
      ) {
        handleAuthFailure();
        return;
      }

      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message ||
              "Unable to update your profile."
          : "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main
        className="
          mx-auto
          w-full
          max-w-7xl
          flex-1
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >
        <ProfileSkeleton />
      </main>
    );
  }

  if (!profile) {
    return (
      <main
        className="
          mx-auto
          w-full
          max-w-7xl
          flex-1
          px-4
          py-10
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-5
            text-sm
            text-red-700
          "
        >
          {error ||
            "Instructor profile could not be loaded."}
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-7xl
        flex-1
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      <InstructorProfileHeader
        fullName={profile.fullName}
        designation={
          profile.designation
        }
        organization={
          profile.organization
        }
      />

      {(error || message) && (
        <div className="mt-5">
          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                font-medium
                text-red-700
              "
            >
              {error}
            </div>
          )}

          {message && (
            <div
              className="
                rounded-xl
                border
                border-emerald-200
                bg-emerald-50
                px-4
                py-3
                text-sm
                font-medium
                text-emerald-700
              "
            >
              {message}
            </div>
          )}
        </div>
      )}

      <div
        className="
          mt-6
          grid
          gap-6
          lg:grid-cols-[minmax(0,1fr)_340px]
        "
      >
        <InstructorProfileForm
          profile={profile}
          saving={saving}
          onSave={handleSave}
        />

        <aside className="space-y-6">
          <InstructorProfileOverview
            profile={profile}
          />

          <InstructorAccountInfo
            email={profile.email}
          />
        </aside>
      </div>
    </main>
  );
}

function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div
        className="
          h-52
          rounded-3xl
          bg-slate-100
        "
      />

      <div
        className="
          mt-6
          grid
          gap-6
          lg:grid-cols-[minmax(0,1fr)_340px]
        "
      >
        <div
          className="
            h-[520px]
            rounded-2xl
            bg-slate-100
          "
        />

        <div className="space-y-6">
          <div
            className="
              h-80
              rounded-2xl
              bg-slate-100
            "
          />

          <div
            className="
              h-52
              rounded-2xl
              bg-slate-100
            "
          />
        </div>
      </div>
    </div>
  );
}