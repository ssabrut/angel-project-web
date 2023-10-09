"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DiaryTemplate({ diaries, fingerprint, name }) {
  const [detailDiary, setDetailDiary] = useState({}); // {title: "", content: "", timestamp: ""}
  const [listDiary, setListDiary] = useState(diaries);
  const [titleDiary, setTitleDiary] = useState("");
  const [contentDiary, setContentDiary] = useState("");

  const router = useRouter();
  const handleBackToHome = () => {
    router.push("/");
  };

  const handleDirectionForChat = () => {
    router.push(`/chat/${fingerprint}/diary/${name}`);
  };

  const handleShowDetailDiary = (val) => {
    return () => {
      setDetailDiary(val);
      document.getElementById("my_modal_3").showModal();
    };
  };

  const handleSavingDiary = () => {
    const bodyData = {
      content: contentDiary,
      title: titleDiary,
    };
    let url = `/api/diary/${fingerprint}`;
    if (diaries.length > 0) {
      url = `/api/diary/${fingerprint}/insert`;
    }
    axios
      .post(url, bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        const currentDate = new Date().toLocaleDateString("en-GB");
        // const timestamp = currentDate.getTime();

        return {
          ...bodyData,
          timestamp: currentDate,
        };
      })
      .then((data) => {
        setListDiary([...listDiary, data]);
        setTitleDiary("");
        setContentDiary("");
        document.getElementById("my_modal_5").close();
      });
  };

  const renderListDiaries = () => {
    return listDiary.map((val, i) => {
      return (
        <div
          key={i}
          className="w-1/3 h-40 p-1 cursor-pointer"
          onClick={handleShowDetailDiary(val)}
        >
          <div className="card w-full h-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{val.timestamp}</h2>
              <p className="indent-4 line-clamp-3">{val.content}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{detailDiary.timestamp}</h3>
          <p className="py-4">{detailDiary.content}</p>
        </div>
      </dialog>
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col w-full">
            <div className="p-2 pr-8 w-full">
              <input
                type="text"
                placeholder="Diary Title"
                className="input input-bordered w-full"
                value={titleDiary}
                onChange={(e) => setTitleDiary(e.target.value)}
              />
            </div>
            <div className="p-2 pr-8 w-full">
              <textarea
                placeholder="Diary Content"
                className="textarea textarea-bordered textarea-lg w-full h-64"
                value={contentDiary}
                onChange={(e) => setContentDiary(e.target.value)}
              ></textarea>
            </div>
            <div className="p-2 pr-8 w-full">
              <button
                className="btn btn-secondary w-full"
                onClick={handleSavingDiary}
              >
                Save Diary
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <div className="navbar bg-base-200 w-full flex flex-row justify-between p-3">
        <div className="w-1/6 order-first">
          <button className="btn btn-neutral h-full" onClick={handleBackToHome}>
            Home
          </button>
        </div>
        <div className="w-1/6 order-none">
          <button
            className="btn btn-primary h-full"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Add Diary
          </button>
        </div>
        <div className="w-1/6 order-last">
          <button
            className="btn btn-accent w-full h-full"
            onClick={handleDirectionForChat}
          >
            Chat
          </button>
        </div>
      </div>
      <div className="w-full h-5/6 overflow-y-auto p-3">
        <div className="flex flex-row flex-wrap place-content-start gap-0 h-full">
          {renderListDiaries()}
        </div>
      </div>
    </>
  );
}
