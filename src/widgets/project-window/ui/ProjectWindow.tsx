"use client";

import { projects } from "@/src/entities";
import Image from "next/image";

interface ProjectWindowProps {
  appId: string;
}

export const ProjectWindow = ({ appId }: ProjectWindowProps) => {
  const project = projects.find((p) => p.id === appId);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        프로젝트를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1 overflow-y-auto h-full scrollbar-hide">
      <section>
        <div className="flex justify-between items-center gap-2">
          <h2 className="text-3xl font-bold text-white mb-3">
            {project.title}
          </h2>
          <Image
            src={project.image}
            alt={project.title}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-md border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {project.introduce && (
        <section>
          <h3 className="text-lg font-semibold text-white/90 mb-2 border-l-4 border-blue-500 pl-3">
            프로젝트 소개
          </h3>{" "}
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {project.introduce}
          </p>
        </section>
      )}
    </div>
  );
};
