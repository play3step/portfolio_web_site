"use client";

import { projects } from "@/src/entities";
import Image from "next/image";
import { motion } from "framer-motion";

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
    <div className="h-full overflow-y-auto scrollbar-hide p-1 space-y-8">
      <section>
        <div className="flex justify-between items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold text-white">{project.title}</h2>
          <div className="relative w-[80px] h-[80px] rounded-2xl overflow-hidden shadow-lg border border-white/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-md border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.links && project.links.length > 0 && (
          <div className="flex gap-3 mb-8">
            {project.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors border border-white/10"
              >
                <span className="capitalize">{link.type}</span>
                <span className="text-xs">↗</span>
              </a>
            ))}
          </div>
        )}
      </section>

      {project.description && (
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full" />
            상세 소개
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap bg-white/5 p-4 rounded-xl border border-white/5">
            {project.description}
          </p>
        </section>
      )}

      {project.features && (
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full" />
            주요 기능
          </h3>
          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-start gap-3 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.troubleshooting && (
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500 rounded-full" />
            트러블슈팅
          </h3>
          <div className="space-y-3">
            {project.troubleshooting.map((item, idx) => (
              <div
                key={idx}
                className="bg-black/20 rounded-xl p-4 border border-white/5"
              >
                <h4 className="font-bold text-red-300 text-sm mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && (
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-purple-500 rounded-full" />
            갤러리
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                className="aspect-video bg-black/50 rounded-lg overflow-hidden relative border border-white/10 hover:border-white/30 transition-colors"
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                  IMG {idx + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
