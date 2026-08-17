import Image from "next/image";
import {
  PiFilePdfFill,
  PiFileDocFill,
  PiFileXlsFill,
  PiFileTxtFill,
  PiFileHtmlFill,
  PiFileFill,
} from "react-icons/pi";
import { BiSolidFileJson } from "react-icons/bi";

type FilePreviewBoxProps = {
  name: string;
  type: string;
  imageUrl?: string;
};

const getFileIcon = (type: string) => {
  const className = "text-avocado";
  const size = 50;

  if (type.startsWith("application/pdf")) {
    return <PiFilePdfFill size={size} className={className} />;
  }

  if (
    type.startsWith(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    )
  ) {
    return <PiFileDocFill size={size} className={className} />;
  }

  if (
    type.startsWith(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )
  ) {
    return <PiFileXlsFill size={size} className={className} />;
  }

  if (type.startsWith("text/plain")) {
    return <PiFileTxtFill size={size} className={className} />;
  }

  if (type.startsWith("application/json")) {
    return <BiSolidFileJson size={size} className={className} />;
  }

  if (type.startsWith("text/html")) {
    return <PiFileHtmlFill size={size} className={className} />;
  }

  return <PiFileFill size={size} className={className} />;
};

const FilePreviewBox = ({ name, type, imageUrl }: FilePreviewBoxProps) => {
  const isImage = type.startsWith("image/");

  if (isImage && imageUrl) {
    return (
      <a
        href={imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={300}
          height={300}
          quality={100}
          className="w-full h-full object-contain cursor-pointer"
        />
      </a>
    );
  }

  return (
    <div
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center px-2 text-center text-xs text-gray-600"
      onClick={() => imageUrl && window.open(imageUrl, "_blank")}
    >
      {getFileIcon(type)}
      <p className="w-full truncate">{name}</p>
    </div>
  );
};

export default FilePreviewBox;
// import Image from "next/image";
// import {
//   PiFilePdfFill,
//   PiFileDocFill,
//   PiFileXlsFill,
//   PiFileTxtFill,
//   PiFileHtmlFill,
//   PiFileFill,
// } from "react-icons/pi";
// import { BiSolidFileJson } from "react-icons/bi";

// type FilePreviewBoxProps = {
//   name: string;
//   type: string;
//   imageUrl?: string;
// };

// const getFileIcon = (type: string) => {
//   if (type.startsWith("application/pdf")) return PiFilePdfFill;
//   if (
//     type.startsWith(
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     )
//   )
//     return PiFileDocFill;
//   if (
//     type.startsWith(
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     )
//   )
//     return PiFileXlsFill;
//   if (type.startsWith("text/plain")) return PiFileTxtFill;
//   if (type.startsWith("application/json")) return BiSolidFileJson;
//   if (type.startsWith("text/html")) return PiFileHtmlFill;
//   return PiFileFill;
// };

// const FilePreviewBox = ({ name, type, imageUrl }: FilePreviewBoxProps) => {
//   const isImage = type.startsWith("image/");
//   const Icon = getFileIcon(type);

//   if (isImage && imageUrl) {
//     return (
//       <a
//         href={imageUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block w-full h-full"
//       >
//         <Image
//           src={imageUrl}
//           alt={name}
//           width={300}
//           height={300}
//           quality={100}
//           className="w-full h-full object-contain cursor-pointer"
//         />
//       </a>
//     );
//   }

//   return (
//     <div
//       className="w-full h-full flex flex-col items-center justify-center text-gray-600 text-xs text-center px-2"
//       onClick={() => {
//         window.open(imageUrl, "_blank");
//       }}
//     >
//       <Icon size={50} className="text-cyan" />
//       <p className="truncate w-full">{name}</p>
//     </div>
//   );
// };

// export default FilePreviewBox;
