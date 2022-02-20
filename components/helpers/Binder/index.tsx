import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  Ref,
} from "react";

interface Props {
  children: ReactNode;
  classNames?: (string | undefined)[];
  [key: string]: any;
}

interface HasClassNameProps {
  className: string;
  [key: string]: any;
}

function createClassName(names: (string | undefined)[]): string {
  return names
    .filter(name => {
      if (typeof name === "string") {
        return name.trim();
      }

      return "";
    })
    .join("");
}

function checkHasClassName(props: {
  [key: string]: any;
}): props is HasClassNameProps {
  return typeof props.className === "string";
}

function addPropsToChildren(
  children: Props["children"],
  props: { [key: string]: any },
  ref: Ref<HTMLElement | null> | null
): ReactNode {
  const childProps = ref !== null ? { ...props, ref } : { ...props };

  return Children.map(children, child => {
    if (!isValidElement(child)) {
      return null;
    }

    const className = createClassName([
      props.className,
      checkHasClassName(child.props) ? child.props.className : "",
    ]);

    return className !== ""
      ? cloneElement(child, { ...childProps, ...{ className } })
      : cloneElement(child, { ...childProps });
  });
}

export const Binder = forwardRef<HTMLElement | null, Props>(
  ({ children, classNames = [], ...rest }, ref) => {
    const className: string = createClassName(classNames);

    return className !== "" ? (
      <>{addPropsToChildren(children, { className, ...rest }, ref)}</>
    ) : (
      <>{addPropsToChildren(children, { ...rest }, ref)}</>
    );
  }
);

// esLint が怒るので displayName を付与
Binder.displayName = "Binder";
