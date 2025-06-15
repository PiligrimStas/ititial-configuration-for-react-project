import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "shared/ui/Loader/Loader";

import {pageLoader} from "./PageLoader.module.scss";

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(pageLoader, {}, [className ?? ""])}>
        <Loader />
    </div>
);
