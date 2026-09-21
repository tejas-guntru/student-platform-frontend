"use client";

import {
  codingPlatforms,
} from "@/constants/codingPlatforms";

import type {
  CodingPlatform,
  CodingProfile,
} from "@/types/codingProfile";

import CodingPlatformCard from "@/components/coding-profiles/CodingPlatformCard";

interface CodingProfilesListProps {
  usernames:
    Record<CodingPlatform, string>;

  editingPlatform:
    CodingPlatform | null;

  workingPlatform:
    CodingPlatform | null;

  getProfile:
    (
      platform:
        CodingPlatform
    ) =>
      | CodingProfile
      | undefined;

  onUsernameChange:
    (
      platform:
        CodingPlatform,
      value: string
    ) => void;

  onConnect:
    (
      platform:
        CodingPlatform
    ) => void;

  onEdit:
    (
      profile:
        CodingProfile
    ) => void;

  onCancel:
    (
      profile:
        CodingProfile
    ) => void;

  onUpdate:
    (
      profile:
        CodingProfile
    ) => void;

  onRefresh:
    (
      platform:
        CodingPlatform
    ) => void;
}

export default function CodingProfilesList({
  usernames,

  editingPlatform,
  workingPlatform,

  getProfile,

  onUsernameChange,

  onConnect,
  onEdit,
  onCancel,
  onUpdate,
  onRefresh,
}: CodingProfilesListProps) {
  return (
    <section className="mt-8 space-y-6">
      {codingPlatforms.map(
        (config) => {
          const profile =
            getProfile(
              config.platform
            );

          const editing =
            editingPlatform ===
            config.platform;

          const working =
            workingPlatform ===
            config.platform;

          return (
            <CodingPlatformCard
              key={
                config.platform
              }
              config={
                config
              }
              profile={
                profile
              }
              username={
                usernames[
                  config.platform
                ]
              }
              editing={
                editing
              }
              working={
                working
              }
              onUsernameChange={
                onUsernameChange
              }
              onConnect={
                onConnect
              }
              onEdit={
                onEdit
              }
              onCancel={
                onCancel
              }
              onUpdate={
                onUpdate
              }
              onRefresh={
                onRefresh
              }
            />
          );
        }
      )}
    </section>
  );
}