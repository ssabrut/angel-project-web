"use client";

import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import axios from "axios";

import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";

export default function FormName() {
  const router = useRouter();
  const [fingerprint, setFingerprint] = useState("");

  const [name, setName] = useState(undefined);
  useSWR(fingerprint ? `/api/users/${fingerprint}` : null, (url) => {
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setName(data.data.name);
        return data.data;
      });
  });

  getCurrentBrowserFingerPrint().then((fingerprint) => {
    setFingerprint(fingerprint.toString());
  });

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (type) => {
    return () => {
      // saving naming and type conversation to database
      Promise.all([
        axios.post(
          `/api/users`,
          { fingerprint: fingerprint, name: name },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        axios.post(
          `/api/conversation/${fingerprint}/${type}`,
          { conversation_type: type },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
      ]).then((res) => {
        if (type == "diary") {
          router.push(`/diaries/${fingerprint}/${name}`);
        } else {
          router.push(`/chat/${fingerprint}/${type}/${name}`);
        }
      });
    };
  };

  return (
    <>
      <h2 className="card-title">Tell me your Name</h2>
      <input
        type="text"
        placeholder="Input your name here.."
        className="input input-bordered w-full max-w-xs"
        value={name}
        onChange={handleChangeName}
      />
      <div className="card-actions justify-end mt-1">
        <button
          className="btn btn-secondary"
          onClick={handleSubmit("diary").bind(this)}
        >
          Write a Diary
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit("counseling").bind(this)}
        >
          Need Counseling
        </button>
      </div>
    </>
  );
}
