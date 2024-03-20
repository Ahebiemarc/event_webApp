import { Rating } from "@material-tailwind/react";
 
export function DefaultRating({value}) {
  return <Rating unratedColor="amber" ratedColor="amber" value={value} className="my-6" />;
}