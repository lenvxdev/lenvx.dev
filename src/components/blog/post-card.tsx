import { PostCardProps } from "@/lib/types/posts";
import { Link } from "next-view-transitions";
import { motion, HTMLMotionProps } from "framer-motion";

const MotionLink = motion(Link);

type MotionPostCardProps = PostCardProps & HTMLMotionProps<"a">;

export function PostCard(props: MotionPostCardProps) {
  const {
    title,
    createdAt,
    updatedAt,
    description,
    tags,
    readingTime,
    className,
    ...motionProps
  } = props;

  return (
    <MotionLink
      href={`/blog/${props.slug}`}
      className={`group/postcard w-full bg-secondary/10 backdrop-blur-sm rounded-md border border-border transition-all duration-300 hover:scale-[1.01] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] block ${className}`}
      {...motionProps}
    >
      <div className="w-full flex flex-col px-5 pt-3 gap-1">
        <h3 className="w-full font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {createdAt === updatedAt && (
            <span>
              Published on {new Date(createdAt).toLocaleDateString("en-GB")} &bull;{" "}
              Reading time: {readingTime}
            </span>
          )}
          {createdAt !== updatedAt && (
            <span>
              Published on {new Date(createdAt).toLocaleDateString("en-GB")} &bull;{" "}
              Last updated on {new Date(updatedAt).toLocaleDateString("en-GB")} &bull;{" "}
              Reading time: {readingTime}
            </span>
          )}
        </p>
      </div>
      <p className="w-full px-5 py-3 text-sm line-clamp-2">{description}</p>
      <div className="w-full px-5 pb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-full hover:bg-cyan-500 hover:scale-105 transition-all duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </MotionLink>
  );
}
