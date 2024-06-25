import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import VideoPlayer from "~/components/profile/components/video-player";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteAsset } from "~/server/actions/profile";
import { Asset, UserProfile } from "~/lib/types";

export default function MusicianContent({
  content,
  userProfile,
  isCurrentUser,
}: {
  content: (Asset & { sasUrl?: string })[];
  userProfile: UserProfile;
  isCurrentUser: boolean;
}) {
  return (
    <div className="xl:flex xl:flex-col xl:gap-8">
      {!content.length && (
        <div className="flex justify-center">
          {userProfile.type === "venue" ? (
            <h1 className="text-center">No events yet.</h1>
          ) : (
            <h1 className="text-center">No performances yet.</h1>
          )}
        </div>
      )}
      {content.map((asset) => (
        <div key={asset.id} className="relative gap-6 xl:flex">
          <div className="hidden xl:block">
            <Avatar>
              <AvatarImage src="/images/edm.jpg" alt="profile picture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex xl:hidden">
                <div className="mr-6 xl:hidden">
                  <Avatar>
                    <AvatarImage src="/images/edm.jpg" alt="profile picture" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="my-1">
                  <h1 className="font-semibold">{asset.title}</h1>
                  <h2>{asset.description}</h2>
                </div>
              </div>

              <div className="my-1 hidden xl:block">
                <h1 className="font-semibold">{asset.title}</h1>
                <h2>{asset.description}</h2>
              </div>
              {isCurrentUser && (
                <div className="mt-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/*<DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
                      {/*<DropdownMenuItem*/}
                      {/*  onClick={() => navigator.clipboard.writeText("hi")}*/}
                      {/*>*/}
                      {/*  Copy payment ID*/}
                      {/*</DropdownMenuItem>*/}
                      {/*<DropdownMenuSeparator />*/}
                      {/*<DropdownMenuItem>Edit</DropdownMenuItem>*/}
                      {/*<DropdownMenuItem>*/}
                      {/*  <AlertDialog>*/}
                      {/*    <AlertDialogTrigger asChild>*/}
                      {/*      <p className="h-full w-full text-red-600">Delete</p>*/}
                      {/*    </AlertDialogTrigger>*/}
                      {/*    <AlertDialogContent>*/}
                      {/*      <AlertDialogHeader>*/}
                      {/*        <AlertDialogTitle>*/}
                      {/*          Are you absolutely sure?*/}
                      {/*        </AlertDialogTitle>*/}
                      {/*        <AlertDialogDescription>*/}
                      {/*          This action cannot be undone. This will permanently*/}
                      {/*          delete your account and remove your data from our*/}
                      {/*          servers.*/}
                      {/*        </AlertDialogDescription>*/}
                      {/*      </AlertDialogHeader>*/}
                      {/*      <AlertDialogFooter>*/}
                      {/*        <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
                      {/*        <AlertDialogAction>Continue</AlertDialogAction>*/}
                      {/*      </AlertDialogFooter>*/}
                      {/*    </AlertDialogContent>*/}
                      {/*  </AlertDialog>*/}
                      {/*</DropdownMenuItem>*/}
                      <DropdownMenuItem
                        onClick={async () =>
                          deleteAsset(asset.id, userProfile.id)
                        }
                      >
                        <p className="font-bold text-red-600">Delete</p>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <div className="mt-4">
              <VideoPlayer asset={asset} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}