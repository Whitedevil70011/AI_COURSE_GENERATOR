import React, { useState, createContext, useContext } from "react";

const DialogContext = createContext(null);

export function Dialog({ children, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v) => {
    if (!isControlled) setInternalOpen(v);
    if (typeof onOpenChange === "function") onOpenChange(v);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, asChild }) {
  const ctx = useContext(DialogContext);
  const child = React.Children.only(children);
  const props = { onClick: () => ctx.setOpen(true) };

  if (asChild) return React.cloneElement(child, { ...child.props, ...props });
  return (
    <button type="button" onClick={() => ctx.setOpen(true)}>
      {children}
    </button>
  );
}

export function DialogContent({ children, className = "", ...rest }) {
  const ctx = useContext(DialogContext);
  if (!ctx?.open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4`} {...rest}>
      <div className="fixed inset-0 bg-black/50" onClick={() => ctx.setOpen(false)} />
      <div className={`${className} relative z-10`}>{children}</div>
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="px-4 py-3">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h3 className="text-lg font-medium">{children}</h3>;
}

export default Dialog;
