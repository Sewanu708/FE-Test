'use client'
import React, { createContext, useState } from 'react'

export const InputContext = createContext();
function GlobalState({ children }) {
  const [input, setInput] = useState('');
  const [chatMode, setChatMode] = useState(false);
  const [chat, setChat] = useState([])
  const [highlightedText, setHighlightedText] = useState(false)
  return (
    <InputContext.Provider value={{ input, setInput, chatMode, setChatMode, chat, setChat }}>
      {children}
    </InputContext.Provider>
  )
}

export default GlobalState