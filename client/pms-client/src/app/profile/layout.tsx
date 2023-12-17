import React from "react";
import Breadcrumbs from "./../../components/ui/breadcrumbs";
import ProfileNav from "./profile-nav";

type Props = {
  children?: React.ReactNode;
};

export default function ProfileLayout({ children }: Props) {
  return (
    <main className="py-8 px-56">
      <div className="flex items-center justify-between">
        <Breadcrumbs />
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <ProfileNav />
        {children}
      </div>
    </main>
  );
}
