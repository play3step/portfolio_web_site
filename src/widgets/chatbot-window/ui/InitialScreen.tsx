import Image from "next/image";

export const InitialScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8">
      <div className="relative mb-2">
        <Image
          src="/icon/glass.svg"
          alt="chatbot-window-logo"
          width={200}
          height={200}
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 text-center">
        평소 궁금해 하는 모든것을
        <br />
        저에게 질문하세요
      </h2>
    </div>
  );
};
