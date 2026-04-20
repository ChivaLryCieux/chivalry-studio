import Link from "next/link";
import styles from "./bitcoin-story.module.css";
import { BitcoinNarrativeGallery } from "./BitcoinNarrativeGallery";

interface BitcoinStoryPageProps {
    returnProjectId?: number;
}

export function BitcoinStoryPage({ returnProjectId = 9 }: BitcoinStoryPageProps) {
    return (
        <main className={styles.roomPage}>
            <nav className={styles.roomNav}>
                <Link href={`/displayPage?project=${returnProjectId}`} className={styles.roomNavLink}>
                    Works
                </Link>
                <div className={styles.roomNavMeta}>Satoshi / Bitcoin / Narrative Room</div>
            </nav>

            <div className={styles.roomCanvas}>
                <BitcoinNarrativeGallery />
            </div>
        </main>
    );
}
